// Blog post metadata for static blog system
// Add new posts here and create corresponding pages in /app/blog/[slug]/page.tsx

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  featured?: boolean;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "foxomy-code-of-conduct",
    title: "Foxomy Code of Conduct",
    excerpt: "We're excited to announce the launch of Foxomy, a revolutionary hosting platform built from the ground up with performance, reliability, and developer experience in mind.",
    date: "December 17, 2025",
    author: "Foxomy Team",
    readTime: "1 min read",
    category: "Announcements",
    featured: false,
  },
  // {
  //   slug: "optimizing-minecraft-server-performance",
  //   title: "Optimizing Your Minecraft Server for Maximum Performance",
  //   excerpt: "Learn the best practices and configuration tweaks to get the most out of your Minecraft server, from JVM flags to plugin optimization and world management.",
  //   date: "December 3, 2025",
  //   author: "Technical Team",
  //   readTime: "8 min read",
  //   category: "Tutorials",
  // },
  // {
  //   slug: "understanding-ddos-protection",
  //   title: "Understanding DDoS Protection: How We Keep Your Servers Safe",
  //   excerpt: "A deep dive into how modern DDoS protection works and the measures we take to ensure your game servers stay online even under attack.",
  //   date: "November 28, 2025",
  //   author: "Security Team",
  //   readTime: "6 min read",
  //   category: "Security",
  // },
];

// Helper to get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

// Helper to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

// Get all unique categories
export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}







