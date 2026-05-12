const fs = require("fs");
const path = require("path");

const headerPath = path.join(__dirname, "..", "src", "shared", "components", "Header.tsx");
const source = fs.readFileSync(headerPath, "utf8");

const wishlistBlock = source.match(/<Link href="\/wishlist" className="relative text-\[#333\] hover:text-primary transition-colors">[\s\S]*?<\/Link>/);
const cartBlock = source.match(/<Link href="\/cart" className="relative text-\[#333\] hover:text-primary transition-colors">[\s\S]*?<\/Link>/);

if (!wishlistBlock) {
  console.error("Could not find the mobile wishlist icon block.");
  process.exit(1);
}

if (!cartBlock) {
  console.error("Could not find the mobile cart icon block.");
  process.exit(1);
}

if (!wishlistBlock[0].includes('absolute -top-1.5 -right-1.5')) {
  console.error("Wishlist badge no longer uses the expected top-right position.");
  process.exit(1);
}

if (!cartBlock[0].includes('absolute -top-1.5 -right-1.5')) {
  console.error("Cart badge is not aligned to the same top-right position as the wishlist badge.");
  process.exit(1);
}

console.log("Mobile cart badge matches wishlist badge positioning.");
