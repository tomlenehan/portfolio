import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Database,
  FileSearch,
  Landmark,
  Mail,
  Network,
  Play,
  Rocket,
  Server,
  ShieldCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";

const projects = [
  {
    title: "Brand Bounty",
    projectType: "Personal Project",
    kicker: "Creator marketplace",
    logo: "/assets/projects/brand-bounty-mark.png",
    icon: Rocket,
    accent: "#14b8a6",
    accentSoft: "rgba(20, 184, 166, 0.18)",
    summary:
      "A challenge-based campaign platform where brands post social bounties and creators compete for milestone-driven prizes.",
    impact:
      "Built as a DB-backed, role-aware MVP with active bounty discovery, leaderboards, submissions, and creator/brand dashboards.",
    stack: ["React", "Vite", "Tailwind", "FastAPI", "PostgreSQL", "Docker", "JWT"],
    signals: ["Live API surfaces", "Role-aware dashboards", "Marketplace mechanics"],
    action: {
      type: "external",
      href: "https://brandbounty.biz/",
      label: "Visit site",
    },
  },
  {
    title: "Question Politics",
    projectType: "Personal Nonprofit Project",
    kicker: "Civic tech nonprofit",
    logo: "/assets/projects/question-politics-logo.png",
    icon: Landmark,
    accent: "#3b82f6",
    accentSoft: "rgba(59, 130, 246, 0.18)",
    summary:
      "A Django and React platform that turns congressional bills into accessible summaries and helps people engage with representatives.",
    impact:
      "Founded the nonprofit product, pairing LLM bill translation with representative lookup, outreach flows, Twilio calling, and congressional data imports.",
    stack: ["Django", "React", "PostgreSQL", "OpenAI", "LangChain", "SerpAPI", "Twilio"],
    signals: ["Plain-English bills", "Representative outreach", "Congress.gov imports"],
    action: {
      type: "external",
      href: "https://questionpolitics.org/",
      label: "Visit site",
    },
  },
  {
    title: "LawCrawl",
    projectType: "Personal Project",
    kicker: "AI contract review",
    logo: "/assets/projects/lawcrawl-mark.png",
    icon: FileSearch,
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.18)",
    summary:
      "A legal document workspace for uploading contracts, surfacing unusual terms, and asking plain-English follow-up questions.",
    impact:
      "Founded and shipped an AI review product using embeddings, agents, evaluators, fine-tuning experiments, and document chat workflows.",
    stack: ["Python", "Django", "React", "LangChain", "OpenAI", "Pinecone", "PDF review"],
    signals: ["Clause-focused review", "Vector search", "Agentic chat"],
    action: {
      type: "video",
      label: "Watch demo",
    },
  },
];

const skillGroups = [
  {
    title: "Product Frontends",
    icon: Code2,
    items: ["React", "TypeScript", "JavaScript", "Tailwind", "Vite", "Framer Motion", "Chakra UI"],
  },
  {
    title: "Backends",
    icon: Database,
    items: ["Python", "FastAPI", "Django", "PostgreSQL", "REST APIs", "Auth", "SQLAlchemy"],
  },
  {
    title: "AI Systems",
    icon: Bot,
    items: ["OpenAI", "RAG", "LangChain", "LangGraph", "Pinecone", "Chroma", "LlamaIndex"],
  },
  {
    title: "Infrastructure",
    icon: Network,
    items: ["Docker", "AWS EC2", "AWS RDS", "Git", "SageMaker", "Kinesis", "Redshift"],
  },
];

const navItems = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  );
}

function ProjectCard({ project, index, isActive, onActivate, onOpenVideo }) {
  const Icon = project.icon;

  return (
    <motion.article
      className={`project-card ${isActive ? "is-active" : ""}`}
      style={{
        "--accent": project.accent,
        "--accent-soft": project.accentSoft,
      }}
      onMouseEnter={onActivate}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
    >
      <div className="project-card__topline">
        <div className="project-card__labels">
          <span className="project-type">{project.projectType}</span>
          <span>{project.kicker}</span>
        </div>
        <Icon aria-hidden="true" />
      </div>
      <div className="project-card__brand">
        <div className="project-card__logo">
          <img src={project.logo} alt={`${project.title} logo`} />
        </div>
        <div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
      </div>
      <p className="project-card__impact">{project.impact}</p>
      <div className="signal-list" aria-label={`${project.title} highlights`}>
        {project.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <div className="tech-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {project.action.type === "external" ? (
        <a
          className="project-card__action"
          href={project.action.href}
          target="_blank"
          rel="noreferrer"
          onFocus={onActivate}
        >
          {project.action.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : (
        <button className="project-card__action" type="button" onClick={onOpenVideo} onFocus={onActivate}>
          {project.action.label}
          <Play aria-hidden="true" />
        </button>
      )}
    </motion.article>
  );
}

function HeroConstellation({ activeProject, setActiveProject }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };

  return (
    <div
      className="constellation"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        "--tilt-x": `${tilt.y * -5}deg`,
        "--tilt-y": `${tilt.x * 7}deg`,
        "--pointer-x": `${50 + tilt.x * 10}%`,
        "--pointer-y": `${50 + tilt.y * 10}%`,
      }}
    >
      <div className="constellation__grid" aria-hidden="true" />
      <div className="constellation__core">
        <span className="core-label">Product systems</span>
        <strong>AI + full stack</strong>
        <span>React, Python, data, infrastructure</span>
      </div>
      {projects.map((project, index) => {
        const isActive = project.title === activeProject;
        return (
          <button
            className={`orbit-node orbit-node--${index + 1} ${isActive ? "is-active" : ""}`}
            key={project.title}
            type="button"
            onFocus={() => setActiveProject(project.title)}
            onMouseEnter={() => setActiveProject(project.title)}
            onClick={() => setActiveProject(project.title)}
            style={{
              "--accent": project.accent,
              "--accent-soft": project.accentSoft,
            }}
            aria-label={`Highlight ${project.title}`}
          >
            <img src={project.logo} alt="" />
            <span>{project.title}</span>
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(projects[0].title);
  const [isLawCrawlVideoOpen, setIsLawCrawlVideoOpen] = useState(false);
  const videoDialogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const heroY = useTransform(smoothProgress, [0, 0.28], [0, -90]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0.65]);

  const active = useMemo(
    () => projects.find((project) => project.title === activeProject) ?? projects[0],
    [activeProject],
  );

  useEffect(() => {
    if (!isLawCrawlVideoOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsLawCrawlVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    videoDialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLawCrawlVideoOpen]);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />

      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="Tom Lenehan home">
          <span>TL</span>
          <strong>Tom Lenehan</strong>
        </a>
        <nav aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <motion.div className="hero-bg" style={{ y: heroY, opacity: heroOpacity }} aria-hidden="true">
            <Parallax speed={-16}>
              <div className="hero-grid" />
            </Parallax>
          </motion.div>

          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="status-pill">
                <span className="pulse-dot" />
                Full-stack AI Engineer
              </span>
              <h1>Tom Lenehan</h1>
              <p>
                A portfolio of personal projects: creator marketplaces, legal-tech tools,
                gov-tech platforms, that promote engagement and complex information feel
                clear.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  See projects
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="mailto:Lenehan3@gmail.com">
                  Contact
                  <Mail aria-hidden="true" />
                </a>
              </div>
              <div className="profile-card" aria-label="Tom Lenehan profile">
                <img src="/assets/profile/tom-headshot.jpg" alt="Tom Lenehan headshot" />
                <div>
                  <strong>Tom Lenehan</strong>
                  <div className="profile-card__links" aria-label="Tom Lenehan resume formats">
                    <a
                      href="https://drive.google.com/file/d/1K3qrQ215rZhv-ROG6di7RDk61oP47e81/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                    >
                      PDF resume
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                    <a
                      href="https://docs.google.com/document/d/1B-ksrPfLnihlmnRackChGDFTy4q1pGic/edit?usp=sharing&ouid=103197416881740540417&rtpof=true&sd=true"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Word resume
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroConstellation activeProject={activeProject} setActiveProject={setActiveProject} />
              <div
                className="active-project-readout"
                style={{
                  "--accent": active.accent,
                  "--accent-soft": active.accentSoft,
                }}
              >
                <span>{active.projectType} / {active.kicker}</span>
                <strong>{active.title}</strong>
                <p>{active.summary}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section project-section" id="projects">
          <SectionHeading
            eyebrow="Selected Personal Projects"
            title="Three products, one through-line: make complex systems usable."
            copy="These personal projects span creator marketplaces, legal review, and civic participation. Each one combines product judgment with practical full-stack delivery."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isActive={project.title === activeProject}
                onActivate={() => setActiveProject(project.title)}
                onOpenVideo={() => setIsLawCrawlVideoOpen(true)}
              />
            ))}
          </div>
        </section>

        <section className="section systems-section">
          <Parallax speed={-8}>
            <div className="systems-band">
              <div className="systems-copy">
                <span className="eyebrow">Operating Style</span>
                <h2>End-to-end product development.</h2>
                <p>
                  I build across the model layer, database, API, and interface. I communicate
                  clearly with clients, product teams, and developers, translating priorities and
                  tradeoffs into reliable software people can use.
                </p>
              </div>
              <div className="system-tiles" aria-label="Operating strengths">
                <span><Workflow /> Agentic workflows</span>
                <span><ShieldCheck /> Evaluation habits</span>
                <span><Users /> Teamwork</span>
                <span><Server /> Delivery</span>
              </div>
            </div>
          </Parallax>
        </section>

        <section className="section skills-section" id="skills">
          <SectionHeading
            eyebrow="Technical Range"
            title="Full-stack skills for AI-powered products."
            copy="Experience across React and TypeScript interfaces, Python APIs, PostgreSQL data models, cloud delivery, and LLM-powered workflows."
          />
          <div className="skills-grid">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article
                  className="skill-card"
                  key={group.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                >
                  <div className="skill-card__header">
                    <Icon aria-hidden="true" />
                    <h3>{group.title}</h3>
                  </div>
                  <div className="tech-list">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <span>Tom Lenehan</span>
        <div>
          <a href="mailto:Lenehan3@gmail.com" aria-label="Email Tom Lenehan">
            <Mail aria-hidden="true" />
          </a>
          <a href="#top" aria-label="Back to top">
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </footer>

      {isLawCrawlVideoOpen ? (
        <div
          className="video-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsLawCrawlVideoOpen(false);
            }
          }}
        >
          <section
            className="video-modal__dialog"
            ref={videoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lawcrawl-video-title"
            tabIndex={-1}
          >
            <div className="video-modal__header">
              <div>
                <span>LawCrawl</span>
                <h2 id="lawcrawl-video-title">Product demo</h2>
              </div>
              <button
                className="video-modal__close"
                type="button"
                onClick={() => setIsLawCrawlVideoOpen(false)}
                aria-label="Close LawCrawl demo"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="video-modal__frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/NZmiZ2CM-18?autoplay=1&rel=0&modestbranding=1"
                title="LawCrawl product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default App;
