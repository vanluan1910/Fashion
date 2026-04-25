require('dotenv').config({ path: 'backend/.env' });
const db = require('./config/db');

async function addSlugColumn() {
  try {
    console.log('Adding slug column to blogs table...');
    await db.execute('ALTER TABLE blogs ADD COLUMN slug VARCHAR(255) AFTER title');
    console.log('Slug column added.');

    const [rows] = await db.execute('SELECT id, title FROM blogs');
    for (const row of rows) {
      const slug = row.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '')
        .replace(/(\s+)/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      console.log(`Updating blog ${row.id} with slug: ${slug}`);
      await db.execute('UPDATE blogs SET slug = ? WHERE id = ?', [slug, row.id]);
    }
    console.log('All blogs updated with slugs.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSlugColumn();
