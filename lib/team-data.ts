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
  accent: "brand" | "emerald" | "violet" | "amber";
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
    role: "C E O",
    photo: "/team/yc-purohit.webp",
    bio: "Y.C. Purohit joined Dynamic Dost in 2015 as CEO, bringing two decades of operational leadership to the company's next phase of growth. He oversees production planning, vendor coordination, quality systems, and export logistics — every shipment that leaves our Tiruppur warehouse passes through his desk. Known for solving problems before they become issues, Purohit has built the systems that let a company our size serve brands the size of theirs.",
    philosophy: "Work is Workship",
    highlights: [
      "CEO since 2015",
      "20+ years of operational leadership",
      "Manages 40+ production lines and 300+ staff",
      "Coordinates logistics across 40+ countries",
    ],
    email: "purohit@dynamicdost.com",
    accent: "emerald",
  },
  {
    slug: "bharath-bhardwaj",
    name: "Bharath Bhardwaj",
    role: "Director Of Sales",
    photo: "/team/bharath-bhardwaj.webp", // Make sure to add this image to your public/team/ folder
    bio: "Bharath is part of the new generation of leadership at Dynamic Dost. As Director of Sales, he brings fresh energy and a modern approach to client relations. He focuses on building long-term partnerships with global brands, expanding our market reach, and ensuring that the sales team delivers the same level of precision that our factory floor does.",
    philosophy:
      "Sales isn't about closing a deal; it's about opening a relationship.",
    highlights: [
      "Leading the next generation of sales strategy",
      "Expanding global B2B partnerships",
      "Bridging traditional manufacturing with modern client needs",
      "Driving revenue growth across new markets",
    ],
    email: "bharath@dynamicdost.com",
    accent: "violet",
  },
  {
    slug: "mahima-bhardwaj",
    name: "Mahima Bhardwaj",
    role: "Director of Threads",
    photo: "/team/mahima-bhardwaj.webp", // Make sure to add this image to your public/team/ folder
    bio: "Mahima leads the Threads division with a sharp eye for quality and innovation. As a young leader, she has quickly mastered the complexities of thread manufacturing, from dyeing processes to tensile strength consistency. She oversees the entire thread production lifecycle, ensuring that every spool that leaves our facility meets the highest standards of durability and colorfastness.",
    philosophy:
      "The strongest bonds are often the ones you can't see holding everything together.",
    highlights: [
      "Spearheading the Threads product division",
      "Implementing advanced color-matching technologies",
      "Ensuring 99%+ consistency in thread tensile strength",
      "Building a specialized team of thread technicians",
    ],
    email: "mahima@dynamicdost.com",
    accent: "amber",
  },
];