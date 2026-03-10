export interface Session {
  number: number;
  creator: string;
  date: string;
  title: string;
  description: string;
  videoId?: string; // Bunny.net video ID (added when videos are uploaded)
  duration?: string;
}

export interface Bundle {
  slug: string;
  skillNum: string;
  name: string;
  tagline: string;
  description: string;
  sessions: Session[];
  pdfUrl?: string; // Supabase Storage path (added when PDFs are uploaded)
}

export const bundles: Bundle[] = [
  {
    slug: "ai-content-growth",
    skillNum: "Create",
    name: "AI Content & Growth Machine",
    tagline: "Create, publish, grow — writing, video, design, audience.",
    description:
      "Master the complete AI content pipeline. From building your AI second brain to automating content repurposing across 8+ platforms, these sessions give you the exact workflows, prompts, and tools the experts use to create and grow.",
    sessions: [
      {
        number: 1,
        creator: "Joel",
        date: "Nov 3 2025",
        title: "Second Brain Blueprint: AI content creation pipeline for newsletters",
        description:
          "Building your AI 2nd brain — the foundation for every content workflow that follows.",
      },
      {
        number: 2,
        creator: "Joel",
        date: "Nov 20 2025",
        title: "Content creation Q&A: live demos of full pipeline",
        description:
          "Live walkthrough of the complete AI content creation pipeline with real-time demos.",
      },
      {
        number: 3,
        creator: "Yana G.Y.",
        date: "Dec 17 2025",
        title: "Automated content repurposing across 8+ social platforms",
        description:
          "AI automation for newsletter growth — building systems that repurpose one piece of content everywhere.",
      },
      {
        number: 4,
        creator: "Jeremy Caplan",
        date: "Feb 12 2026",
        title: "A Day in My Life with AI: 10 daily productivity tools",
        description:
          "Wonder Tools creator shares 10 AI tools he uses daily for content creation and productivity.",
      },
    ],
  },
  {
    slug: "ai-powered-development",
    skillNum: "Build",
    name: "AI-Powered Development",
    tagline: "Build, automate, ship — coding, agents, apps, workflows.",
    description:
      "Learn to build real applications with AI. From vibe-coding to deploying production agents, these sessions cover the practical side of AI development — straight from builders who ship every day.",
    sessions: [
      {
        number: 1,
        creator: "Joel",
        date: "Nov 6 2025",
        title: "Vibe-coding: building apps with AI from scratch",
        description:
          "Live demonstration of building a complete app using AI-assisted development.",
      },
      {
        number: 2,
        creator: "Joel",
        date: "Dec 5 2025",
        title: "AI agents and automation workflows",
        description:
          "Building practical AI agents that automate real business workflows.",
      },
      {
        number: 3,
        creator: "Joel",
        date: "Jan 9 2026",
        title: "Deploying AI apps: from prototype to production",
        description:
          "Taking AI projects from local demos to live production — hosting, APIs, and scaling.",
      },
      {
        number: 4,
        creator: "Joel",
        date: "Feb 6 2026",
        title: "Advanced prompt engineering for developers",
        description:
          "Deep dive into prompt patterns that make AI coding assistants dramatically more effective.",
      },
    ],
  },
  {
    slug: "ai-knowledge-system",
    skillNum: "Think",
    name: "Your AI Knowledge System",
    tagline: "Think, research, organize — second brain, insights, deep thinking.",
    description:
      "Build your personal AI knowledge system. These sessions teach you to capture, organize, and leverage information using AI — turning scattered notes into a powerful thinking tool.",
    sessions: [
      {
        number: 1,
        creator: "Joel",
        date: "Nov 13 2025",
        title: "Building your AI second brain from scratch",
        description:
          "Step-by-step setup of a personal knowledge management system powered by AI.",
      },
      {
        number: 2,
        creator: "Joel",
        date: "Dec 12 2025",
        title: "AI-powered research workflows",
        description:
          "Using AI to accelerate research, synthesize findings, and generate insights.",
      },
      {
        number: 3,
        creator: "Joel",
        date: "Jan 16 2026",
        title: "Deep thinking with AI: analysis and decision frameworks",
        description:
          "Leveraging AI as a thinking partner for complex analysis and strategic decisions.",
      },
      {
        number: 4,
        creator: "Joel",
        date: "Feb 20 2026",
        title: "Connecting the dots: knowledge graphs and AI",
        description:
          "Advanced techniques for linking ideas and discovering patterns across your knowledge base.",
      },
    ],
  },
  {
    slug: "ai-business-leadership",
    skillNum: "Lead",
    name: "AI for Business & Leadership",
    tagline: "Lead, transform, strategize — adoption, roadmaps, organizations.",
    description:
      "Navigate AI transformation as a leader. From building adoption roadmaps to managing AI-augmented teams, these sessions prepare you to lead your organization through the AI revolution.",
    sessions: [
      {
        number: 1,
        creator: "Joel",
        date: "Nov 20 2025",
        title: "AI adoption roadmap for your organization",
        description:
          "Creating a practical, phased plan for bringing AI into your team or company.",
      },
      {
        number: 2,
        creator: "Joel",
        date: "Dec 19 2025",
        title: "Leading AI-augmented teams",
        description:
          "Management frameworks for teams where AI is a daily tool — culture, expectations, and workflows.",
      },
      {
        number: 3,
        creator: "Joel",
        date: "Jan 23 2026",
        title: "AI strategy for business leaders",
        description:
          "Strategic thinking about AI investments, build vs. buy decisions, and competitive positioning.",
      },
      {
        number: 4,
        creator: "Joel",
        date: "Feb 27 2026",
        title: "Measuring AI impact: ROI and transformation metrics",
        description:
          "Frameworks for measuring the real business impact of AI initiatives.",
      },
    ],
  },
];
