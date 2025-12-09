export interface TeamMember {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatar: string;
  bio: string;
  links?: {
    discord?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  skills?: string[];
  joinedDate?: string;
  portfolioBg?: string; // Custom background class for the portfolio (shows through triangle)
}

export const teamMembers: TeamMember[] = [
  {
    id: "bunny",
    name: "Bunny",
    role: "Founder & CEO",
    handle: "@bunny",
    avatar: "/team/bunny.png",
    bio: "Passionate about creating the best hosting experience for the furry community. Started Foxomy to give back to the community that gave so much to me.",
    links: {
      discord: "bunny",
      twitter: "bunnyhost",
      github: "bunny",
    },
    skills: ["Infrastructure", "Customer Relations", "Business Development"],
    joinedDate: "2023",
  },
  {
    id: "felix",
    name: "Felix",
    role: "Lead Developer",
    handle: "@felix",
    avatar: "/team/felix.png",
    bio: "Full-stack developer with a love for clean code and smooth user experiences. Building the tools that make Foxomy tick.",
    links: {
      github: "felix-dev",
      twitter: "felixcodes",
    },
    skills: ["React", "Node.js", "Infrastructure", "DevOps"],
    joinedDate: "2023",
    portfolioBg: "bg-red-900",
  },
  {
    id: "nova",
    name: "Nova",
    role: "Community Manager",
    handle: "@nova",
    avatar: "/team/nova.png",
    bio: "Keeping our Discord server running smoothly and making sure everyone feels welcome. Love helping people solve their hosting problems!",
    links: {
      discord: "nova",
      twitter: "novafluff",
    },
    skills: ["Community Management", "Support", "Content Creation"],
    joinedDate: "2024",
  },
  {
    id: "ash",
    name: "Ash",
    role: "Support Specialist",
    handle: "@ash",
    avatar: "/team/ash.png",
    bio: "Here to help you 24/7! No question is too small, and I'll make sure you get your server running perfectly.",
    links: {
      discord: "ash_support",
    },
    skills: ["Technical Support", "Minecraft", "Server Configuration"],
    joinedDate: "2024",
  },
];
