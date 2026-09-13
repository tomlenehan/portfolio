import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Database,
  FileText,
  FileSearch,
  Github,
  Landmark,
  Linkedin,
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
      "A marketplace where brands launch social campaigns and creators compete for prizes.",
    impact:
      "I built campaign discovery, creator submissions, leaderboards, and dedicated dashboards for brands and creators.",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker"],
    videoId: "nS5-l1Nb6KE",
    action: {
      type: "external",
      href: "https://brandbounty.biz/",
      label: "Visit site",
    },
  },
  {
    title: "Question Politics",
    projectType: "Nonprofit · Founder",
    kicker: "Civic tech nonprofit",
    logo: "/assets/projects/question-politics-logo.png",
    icon: Landmark,
    accent: "#3b82f6",
    accentSoft: "rgba(59, 130, 246, 0.18)",
    summary:
      "Tools that explain congressional legislation in plain English and make it easier to contact representatives.",
    impact:
      "I built the product, secured a $100K Google Ad Grant, and managed advertising and analytics to grow and measure its reach.",
    stack: ["Django", "React", "PostgreSQL", "OpenAI", "Twilio"],
    action: {
      type: "external",
      href: "https://questionpolitics.org/",
      label: "Visit site",
    },
  },
  {
    title: "LawCrawl",
    projectType: "Founder · 2022–2024",
    kicker: "AI contract review",
    logo: "/assets/projects/lawcrawl-mark.png",
    icon: FileSearch,
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.18)",
    summary:
      "A legal document workspace for uploading contracts, surfacing unusual terms, and asking plain-English follow-up questions.",
    impact:
      "I built the contract-analysis product with Python, LangGraph, embeddings, and evaluation, then used customer feedback to improve its features and interface.",
    stack: ["Python", "React", "LangGraph", "OpenAI", "Pinecone"],
    videoId: "NZmiZ2CM-18",
    action: {
      type: "video",
      label: "Watch demo",
    },
  },
];

const skillGroups = [
  { title: "Interfaces", icon: Code2, items: ["JavaScript", "React"] },
  { title: "APIs & data", icon: Database, items: ["Python", "Django", "FastAPI", "PostgreSQL", "Azure SQL Server"] },
  { title: "Applied AI", icon: Bot, items: ["OpenAI", "LangChain", "LangGraph", "LlamaIndex", "Pinecone", "Chroma"] },
  { title: "Cloud & delivery", icon: Network, items: ["AWS Lambda", "EC2", "RDS", "Kinesis", "Redshift", "SageMaker", "Docker", "Render"] },
];

const experience = [
  { company: "MyGovWatch.com", role: "Lead Developer", dates: "2024–Present", copy: "As the sole full-time engineer, I own platform reliability, roadmap priorities, and ongoing improvements. I build AI automation to replace manual workflows, support data ingestion with Sequentum and Azure SQL Server, and coordinate third-party engineers." },
  { company: "LawCrawl", role: "Founder", dates: "2022–2024", copy: "Built an AI contract-analysis product from architecture through delivery, combining agentic workflows, vector embeddings, evaluation, and fine-tuning. Turned user feedback into product and interface improvements." },
  { company: "Trellis", role: "Senior Developer", dates: "2022–2023", copy: "Applied LLMs and machine learning to legal-document analysis, testing retrieval and classification methods to help attorneys find and evaluate relevant information." },
  { company: "Proper Media", role: "Senior Developer", dates: "2015–2022", copy: "Co-designed a real-time header-bidding platform with integrations across dozens of ad exchanges. Built AWS data pipelines and internal BI tools, and led monetization initiatives for Salon and Snopes." },
];
const earlierExperience = [
  { company: "Youtily", role: "Full-Stack Developer", dates: "2014–2015", copy: "Built a local-search marketing platform, working directly with founders on product strategy, features, and integrations." },
  { company: "Norima Consulting", role: "Developer", dates: "2012–2014", copy: "Built features for an electronic medical record system serving 95,000+ patients in a HIPAA-regulated environment." },
  { company: "AppNexus", role: "Auditor, Creative Inventory", dates: "2011–2012", copy: "Performed quality assurance on display advertising assets and inventory." },
];
const navItems = [["Projects", "#projects"], ["Experience", "#experience"], ["Skills", "#skills"]];

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

function ProjectCard({ project, index, onOpenVideo }) {
  const Icon = project.icon;
  const isExternal = project.action.type === "external";
  const Action = isExternal ? "a" : "button";
  const actionProps = isExternal
    ? {
        href: project.action.href,
        target: "_blank",
        rel: "noreferrer",
      }
    : {
        type: "button",
        onClick: onOpenVideo,
      };

  return (
    <motion.article
      className="project-card"
      style={{
        "--accent": project.accent,
        "--accent-soft": project.accentSoft,
      }}
      aria-label={project.title}
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
      <div className="tech-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-card__actions">
        <Action
          className="project-card__action project-card__action--primary"
          aria-label={`${project.action.label}: ${project.title}`}
          {...actionProps}
        >
          {project.action.label}
          {isExternal ? <ArrowUpRight aria-hidden="true" /> : <Play aria-hidden="true" />}
        </Action>
        {isExternal && project.videoId ? (
          <button
            className="project-card__action project-card__action--demo"
            type="button"
            onClick={onOpenVideo}
            aria-label={`Watch demo: ${project.title}`}
          >
            Watch demo
            <Play aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}

function ProjectIndex({ onOpenProject }) {
  return (
    <div className="work-index">
      <div className="work-index__intro">
        <span className="eyebrow">From idea to production</span>
        <h2>Products I’ve built.</h2>
        <p>Independent work in the creator economy, civic participation, and applied AI.</p>
      </div>
      {projects.map((project, index) => (
        <button className="work-index__project" key={project.title} onClick={() => onOpenProject(project)} aria-label={`${project.action.label}: ${project.title}`}>
          <span className="work-index__number">0{index + 1}</span>
          <img src={project.logo} alt="" />
          <span><strong>{project.title}</strong><small>{project.kicker}</small></span>
          {project.action.type === "video" ? <Play aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
        </button>
      ))}
      <a className="work-index__current" href="#experience"><span className="pulse-dot" /> Currently leading development at MyGovWatch <ArrowUpRight aria-hidden="true" /></a>
    </div>
  );
}

function ExperienceRow({ item }) {
  return <article className="experience-row">
    <div><span className="experience-date">{item.dates}</span><h3>{item.company}</h3><span className="experience-role">{item.role}</span></div>
    <p>{item.copy}</p>
  </article>;
}

function App() {
  const reducedMotion = useReducedMotion();
  const [videoProject, setVideoProject] = useState(null);
  const videoDialogRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const heroY = useTransform(smoothProgress, [0, 0.28], [0, -90]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0.65]);

  const handleOpenProject = (project) => {
    if (project.action.type === "video") {
      setVideoProject(project);
      return;
    }

    window.open(project.action.href, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!videoProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setVideoProject(null);
      }
    };

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    videoDialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [videoProject]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
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

      <main id="main-content">
        <section className="hero-section" id="top">
          <motion.div className="hero-bg" style={reducedMotion ? undefined : { y: heroY, opacity: heroOpacity }} aria-hidden="true">
            <Parallax speed={-16} disabled={reducedMotion}>
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
                Senior full-stack software engineer
              </span>
              <h1>Tom Lenehan</h1>
              <p className="hero-tagline">I turn complex problems into working products.</p>
              <p className="hero-description">14+ years building software across AI, advertising, and data. I own the work from product direction and architecture through delivery and iteration.</p>
              <span className="hero-location">Philadelphia, PA · Product, AI &amp; solutions</span>
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
                  <div className="profile-card__links" aria-label="Tom Lenehan links">
                    <a
                      href="/assets/Tom-Lenehan-Resume.docx"
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText aria-hidden="true" />
                      Resume (DOCX)
                    </a>
                    <a
                      href="https://www.linkedin.com/in/tom-lenehan/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin aria-hidden="true" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/tomlenehan" target="_blank" rel="noreferrer">
                      <Github aria-hidden="true" />
                      GitHub
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
              <ProjectIndex
                onOpenProject={handleOpenProject}
              />
            </motion.div>
          </div>
        </section>

        <section className="section project-section" id="projects">
          <SectionHeading
            eyebrow="Selected projects"
            title="Built to be used."
            copy="Products I’ve taken from an initial idea to working software, with ownership of the architecture, interface, and delivery."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpenVideo={() => setVideoProject(project)}
              />
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <SectionHeading eyebrow="Experience" title="A career spent building." copy="From advertising infrastructure and regulated software to AI products and platform leadership." />
          <div className="experience-list">{experience.map(item => <ExperienceRow key={item.company} item={item} />)}</div>
          <details className="earlier-experience"><summary>Earlier experience · 2011–2015</summary>{earlierExperience.map(item => <ExperienceRow key={item.company} item={item} />)}</details>
          <div className="education"><span className="eyebrow">Education</span><p><strong>Lehigh University</strong> · B.S. Business Information Systems · 2007–2011</p></div>
        </section>

        <section className="section systems-section">
          <Parallax speed={-8} disabled={reducedMotion}>
            <div className="systems-band">
              <div className="systems-copy">
                <span className="eyebrow">How I work</span>
                <h2>End-to-end product development.</h2>
                <p>
                  Building across the full stack. Communicating
                  clearly with clients and product teams and translating their goals and priorities
                  into reliable products and features.
                </p>
              </div>
              <div className="system-tiles" aria-label="Operating strengths">
                <span><Workflow /> Agentic workflows</span>
                <span><ShieldCheck /> Model evaluation</span>
                <span><Users /> Technical communication</span>
                <span><Server /> Platform reliability</span>
              </div>
            </div>
          </Parallax>
        </section>

        <section className="section skills-section" id="skills">
          <SectionHeading
            eyebrow="Technical skills"
            title="Technologies"
            copy="A practical toolkit for building interfaces, integrating systems, and putting AI into production."
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

        <section className="section contact-section" id="contact">
          <span className="eyebrow">Let’s connect</span>
          <h2>Have a problem worth solving?</h2>
          <p>I’d love to hear about your team and what you’re building.</p>
          <a className="button button-primary" href="mailto:Lenehan3@gmail.com">Get in touch <ArrowUpRight aria-hidden="true" /></a>
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

      {videoProject ? (
        <div
          className="video-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setVideoProject(null);
            }
          }}
        >
          <section
            className="video-modal__dialog"
            ref={videoDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-video-title"
            tabIndex={-1}
          >
            <div className="video-modal__header">
              <div>
                <span>{videoProject.title}</span>
                <h2 id="project-video-title">Product demo</h2>
              </div>
              <button
                className="video-modal__close"
                type="button"
                onClick={() => setVideoProject(null)}
                aria-label={`Close ${videoProject.title} demo`}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="video-modal__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoProject.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${videoProject.title} product demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      ) : null}
    </div>
    </MotionConfig>
  );
}

export default App;
