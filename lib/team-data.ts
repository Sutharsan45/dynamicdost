export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  philosophy: string;
  highlights: string[];
  email?: string;
  linkedin?: string;
  accent: "brand" | "emerald";
}

export const team: TeamMember[] = [
  {
    slug: "mahesh-bharadwaj",
    name: "Mahesh Bharadwaj R",
    role: "Founder & Director",
    photo: "/team/mahesh-bharadwaj.webp",
    bio: "Mahesh founded Dynamic Dost in 1985 with one workshop, two machines, and a conviction that Indian zippers could match anything made anywhere in the world. Four decades later, he still walks the factory floor every morning, challenges every batch of tape coming off the loom, and personally signs off on new product development. His hands-on leadership and refusal to compromise on quality became the DNA of the company.",
    philosophy:
      "Lean doesn't mean small. It means every rupee, every minute, and every meter of tape earns its place.",
    highlights: [
      "Founded the company in 1985 at age 24",
      "Grew from 2 to 40+ production lines",
      "Personally reviews every new product sample",
      "Believes in constant iteration over perfection",
    ],
    email: "mahesh@dynamicdost.com",
    accent: "brand",
  },
  {
    slug: "yc-purohit",
    name: "Y.C. Purohit",
    role: "General Manager",
    photo: "/team/yc-purohit.webp",
    bio: "Y.C. Purohit joined Dynamic Dost in 2015 as General Manager, bringing two decades of operational leadership to the company's next phase of growth. He oversees production planning, vendor coordination, quality systems, and export logistics — every shipment that leaves our Tiruppur warehouse passes through his desk. Known for solving problems before they become issues, Purohit has built the systems that let a company our size serve brands the size of theirs.",
    philosophy:
      "A delivery date is a promise. My job is to make sure we never break one.",
    highlights: [
      "General Manager since 2015",
      "20+ years of operational leadership",
      "Manages 40+ production lines and 300+ staff",
      "Coordinates logistics across 40+ countries",
    ],
    email: "purohit@dynamicdost.com",
    accent: "emerald",
  },
];