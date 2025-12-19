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
  emoji: string;
  featured?: boolean;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "foxomy-is-home-hosted",
    title: "Foxomy Is Home Hosted (Really)",
    excerpt:
      "Foxomy was not a thing yet. Server hosting was just a personal hobby of Bun. Bun has been providing private server hosting services to her furry friends from 2017-2019. This was an ancient relic of Bun's DIY rack in 2019 when she was still in high school.",
    date: "December 18, 2025",
    author: "Trish",
    readTime: "1 min read",
    category: "Infrastructure",
    emoji: "🌐",
    featured: false,
  },
  {
    slug: "how-foxomy-uses-mxroute",
    title: "How Foxomy Uses MXRoute to Guarantee Email Delivery",
    excerpt:
      "For the past 5 years since the beginning of Foxomy, we've always relied on Mailgun to deliver transactional emails to our clients. During those 5 years, we've never had any problems nor have opened a ticket with Mailgun.",
    date: "December 17, 2025",
    author: "Trish",
    readTime: "1 min read",
    category: "Infrastructure",
    emoji: "🌐",
    featured: false,
  },
  {
    slug: "strategic-relations-guidelines",
    title: "Relations Guidelines",
    excerpt:
      "At Foxomy, we believe in focusing on our own work and letting our service speak for itself. Staff members are expected to: Never criticize or slander other hosting providers or communities",
    date: "December 17, 2025",
    author: "Foxomy Team",
    readTime: "1 min read",
    category: "Policy",
    emoji: "📜",
    featured: false,
  },
  {
    slug: "code-of-conduct",
    title: "Community Code of Conduct",
    excerpt:
      "We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size,",
    date: "December 17, 2025",
    author: "Foxomy Team",
    readTime: "1 min read",
    category: "Policy",
    emoji: "📜",
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
