export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
}

export const getBlogsData = async (): Promise<Blog[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/blogs');
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogById = async (id: string | number): Promise<Blog | null> => {
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    return null;
  }
};
