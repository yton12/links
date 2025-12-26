export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  skills: string;
}

export interface Project {
  title: string;
  techStack: string;
  description: string;
  bullets: string[];
  codeUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  graduationDate: string;
  gpa: string;
}

export interface ResumeData {
  name: string;
  role: string;
  contact: ContactInfo;
  summary: string;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education;
}

export const resumeData: ResumeData = {
  name: 'Dinesh Dawonauth',
  role: 'Full-Stack Developer / AI & Data Engineer',
  contact: {
    email: 'hireme@dineshd.dev',
    phone: '437-879-2066',
    location: 'Toronto, ON',
    website: 'dineshd.dev',
    github: 'github.com/dinesh-git17',
    linkedin: 'linkedin.com/in/dineshsdawonauth',
  },
  summary:
    'Senior Software Engineer and Data Scientist with 5+ years of experience engineering scalable systems and data-driven applications. Proven expertise in full-stack development (TypeScript, Python) and AI orchestration. Skilled in translating complex business needs into high-performance technical solutions, having reduced manual reporting time by 40% and improved data processing efficiency by 25% in previous enterprise roles.',
  skills: [
    {
      category: 'Languages',
      skills:
        'Python (Pandas, NumPy), TypeScript, JavaScript, SQL (PostgreSQL, MySQL), R, HTML/CSS',
    },
    {
      category: 'Frontend & UI',
      skills: 'React, Next.js, Tailwind CSS, Framer Motion, TUI (Textual), Tableau, PowerBI',
    },
    {
      category: 'Backend & AI',
      skills:
        'Node.js, REST APIs, Supabase, Redis, LLM Integration (OpenAI, Anthropic), ETL Pipelines',
    },
    {
      category: 'Tools',
      skills: 'Git, Docker, Linux, Excel (Advanced), Agile/Scrum',
    },
  ],
  projects: [
    {
      title: 'Holiday.EXE',
      techStack: 'TypeScript, Next.js, Capacitor, Framer Motion',
      description:
        'A high-performance, offline-first interactive iOS app combining terminal simulation, gaming, and cinematic storytelling.',
      bullets: [
        'Engineered a 60fps mobile-native experience using Capacitor and Next.js, featuring custom delta-time physics and optimized parallax rendering.',
        'Implemented a complex state machine using Zustand to manage biometric auth simulation, mini-games, and terminal encryption puzzles.',
        'Designed a polished "love letter" software architecture with strict TypeScript safety and zero-latency transition effects.',
      ],
      codeUrl: 'https://github.com/dinesh-git17/christmas-gift',
    },
    {
      title: 'Debate Lab',
      techStack: 'TypeScript, Next.js, AI SDKs',
      description:
        'An AI orchestration platform for structured debates between Large Language Models.',
      bullets: [
        'Identified the need for transparent AI model reasoning; built a platform to facilitate unbiased comparisons.',
        'Orchestrated complex multi-agent flows using real-time streaming to visualize logic paths and debate outcomes.',
        'Resulted in a reusable benchmarking tool for testing and validating LLM argumentation capabilities.',
      ],
      codeUrl: 'https://github.com/dinesh-git17/debate-lab',
    },
    {
      title: 'PassFx',
      techStack: 'Python, Cryptography, TUI',
      description: 'A zero-knowledge, offline-first terminal-based password manager.',
      bullets: [
        "Built a secure, local-only secret manager using strong cryptographic primitives and Python's Textual framework.",
        'Designed an intuitive TUI (Text User Interface) to provide a premium developer experience without network dependencies.',
        'Eliminated external attack vectors by enforcing a strict offline-first architecture for sensitive data storage.',
      ],
      codeUrl: 'https://github.com/dinesh-git17/passfx',
    },
    {
      title: 'SweetHearty',
      techStack: 'Full Stack Web',
      description: 'A gamified personal productivity and goal-tracking application.',
      bullets: [
        'Engineered a progress planner with gamification logic and habit tracking to solve user motivation retention issues.',
        'Implemented full-stack logic for tracking user streaks and awarding badges, improving user consistency.',
      ],
      codeUrl: 'https://github.com/dinesh-git17/my-progress-planner',
    },
  ],
  experience: [
    {
      company: 'Meridian Credit Union',
      role: 'Data Scientist',
      period: 'Apr 2024 – Present',
      bullets: [
        'Architected automated data pipelines and dashboards serving 300K+ members, reducing manual reporting time by 40%.',
        'Collaborated with engineering to translate business requirements into scalable analytical solutions.',
        'Identified operational bottlenecks through trend analysis, implementing optimizations that improved efficiency by 25%.',
      ],
    },
    {
      company: 'Slice Labs',
      role: 'Junior Data Scientist',
      period: 'Apr 2021 – Jan 2023',
      bullets: [
        'Developed interactive dashboards using Tableau and SQL to drive executive decision-making.',
        'Implemented robust data validation scripts, improving data accuracy by 35% across the platform.',
        'Utilized SQL for complex query optimization and ad hoc analysis to support operational teams.',
      ],
    },
    {
      company: 'Carleton University',
      role: 'Research & Data Assistant',
      period: 'Sep 2019 – Jul 2023',
      bullets: [
        'Analyzed large datasets consisting of 30K+ records using SQL and Python to support institutional reporting.',
      ],
    },
  ],
  education: {
    institution: 'Carleton University, Ottawa',
    degree: 'Bachelor of Mathematics, Statistics',
    graduationDate: 'Jun 2023',
    gpa: '3.8/4.0',
  },
};
