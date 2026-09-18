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
  RadioTower,
  Rocket,
  Scale,
  HeartPulse,
  X,
} from "lucide-react";

const projects = [
  {
    title: "Brand Bounty",
    projectType: "Personal Project",
    kicker: "Creator marketplace",
    logo: "/assets/projects/brand-bounty-mark.png",
    icon: Rocket,
    accent: "#7dd3fc",
    accentSoft: "rgba(125, 211, 252, 0.16)",
    summary:
      "A creator marketplace where brands reward social content that meets campaign goals.",
    impact:
      "Brands set a platform, engagement target, and reward. Creators compete to reach the goal, while campaign data shows which content performs.",
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
    accent: "#7dd3fc",
    accentSoft: "rgba(125, 211, 252, 0.16)",
    summary:
      "A civic platform that makes congressional bills easier to understand and helps constituents engage with representatives.",
    impact:
      "I founded the nonprofit and built AI tools that translate legislation into plain English and make constituent outreach easier.",
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
    accent: "#7dd3fc",
    accentSoft: "rgba(125, 211, 252, 0.16)",
    summary:
      "An AI-powered contract analysis tool.",
    impact:
      "Built with agentic workflows and fine-tuned models to flag unusual terms and answer questions against source documents with page-level references.",
    stack: ["Python", "React", "LangGraph", "OpenAI", "Pinecone"],
    videoId: "NZmiZ2CM-18",
    action: {
      type: "video",
      label: "Watch demo",
    },
  },
];

const skillGroups = [
  { title: "Frontend", icon: Code2, items: ["JavaScript", "TypeScript", "React", "Angular", "Tailwind"] },
  { title: "Backend", icon: Database, items: ["Python", "Django", "FastAPI", "PostgreSQL", "MySQL", "C#/.NET"] },
  { title: "AI", icon: Bot, items: ["OpenAI/Codex", "LangChain/LangGraph", "LlamaIndex", "Hugging Face", "Pinecone", "Chroma"] },
  { title: "Infra", icon: Network, items: ["AWS: EC2, RDS, Lambda, Kinesis, Redshift, SageMaker", "Docker", "Render", "GitHub"] },
];

const experience = [
  { company: "MyGovWatch.com", role: "Lead Developer", dates: "2024–Present", copy: "Owning the platform as the sole full-time engineer, from infrastructure and reliability to product priorities and ongoing development. Building AI automation for time-consuming internal workflows, supporting high-volume government data pipelines, and coordinating third-party engineering teams." },
  { company: "LawCrawl", role: "Founder", dates: "2022–2024", copy: "built an AI contract-analysis platform from the ground up using agentic workflows, vector RAG, evaluations, and fine-tuned models. Owned the full product lifecycle, using feedback from customers and investors to rapidly iterate on the product and its direction." },
  { company: "Trellis", role: "Senior Developer", dates: "2022–2023", copy: "Built a hybrid legal-document search system combining vector similarity with Elasticsearch keyword search, improving retrieval across a large repository of legal documents." },
  { company: "Proper Media", role: "Senior Developer", dates: "2015–2022", copy: "Co-built a real-time-bidding solution with integrations across dozens of ad exchanges. Built AWS data infrastructure for high-volume bidding data and led new monetization initiatives across major publisher properties including Salon and Snopes." },
];
const earlierExperience = [
  { company: "Youtily", role: "Full-Stack Developer", dates: "2014–2015", copy: "Built a digital marketing platform for small businesses, working closely with the founders on product strategy, new features, and third-party integrations." },
  { company: "Norima Consulting", role: "Developer", dates: "2012–2014", copy: "Helped build an Electronic Medical Record platform managing data for more than 95,000 patients in a HIPAA-regulated environment." },
  { company: "AppNexus", role: "Auditor, Creative Inventory", dates: "2011–2012", copy: "Worked on quality assurance for a large-scale digital advertising marketplace, reviewing creative assets and maintaining inventory quality." },
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

function ProjectCard({ project, index, onOpenProject }) {
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
        onClick: () => onOpenProject(project),
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
      <button
        className="project-card__hit-area"
        type="button"
        onClick={() => onOpenProject(project)}
        aria-label={`${project.action.label}: ${project.title}`}
      />
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
        {/*{isExternal && project.videoId ? (*/}
        {/*  <button*/}
        {/*    className="project-card__action project-card__action--demo"*/}
        {/*    type="button"*/}
        {/*    onClick={() => onOpenProject(project)}*/}
        {/*    aria-label={`Watch demo: ${project.title}`}*/}
        {/*  >*/}
        {/*    Watch demo*/}
        {/*    <Play aria-hidden="true" />*/}
        {/*  </button>*/}
        {/*) : null}*/}
      </div>
    </motion.article>
  );
}

function ProjectIndex({ onOpenProject }) {
  return (
    <div className="work-index">
      <div className="work-index__intro">
        <span className="eyebrow">From concept to production</span>
        <h2>Selected work.</h2>
        <p>Independent products built from concept to working software.</p>
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
                Senior full-stack engineer
              </span>
              <h1>Tom Lenehan</h1>
              <p className="hero-tagline">Turning complex problems into intuitive solutions.</p>
              <p className="hero-description">14+ years of building.</p>
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
                      href="/assets/Tom_Lenehan_Resume.pdf"
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText aria-hidden="true" />
                      Resume
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
            title="Selected independent projects."
            copy="Independent products I’ve taken from an idea to working software."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpenProject={handleOpenProject}
              />
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="14+ years building products that ship."
            copy="From real-time advertising systems to AI products and regulated software."
          />
          <div className="experience-list">{experience.map(item => <ExperienceRow key={item.company} item={item} />)}</div>
          <details className="earlier-experience"><summary>Earlier experience · 2011–2015</summary>{earlierExperience.map(item => <ExperienceRow key={item.company} item={item} />)}</details>
          <div className="education"><span className="eyebrow">Education</span><p><strong>Lehigh University</strong> · B.S. Business Information Systems · 2007–2011</p></div>
        </section>

        <section className="section systems-section">
          <Parallax speed={-8} disabled={reducedMotion}>
            <div className="systems-band">
              <div className="systems-copy">
                <span className="eyebrow">Systems people depend on</span>
                <h2>Across complex domains</h2>
                <p>
                  Building systems where accuracy, scale and trust really matter.
                </p>
              </div>
              <div className="system-tiles" aria-label="Operating strengths">
                <span><RadioTower aria-hidden="true" /> Advertising and real-time data systems</span>
                <span><Scale aria-hidden="true" /> AI and legal-document analysis</span>
                <span><Landmark aria-hidden="true" /> GovTech and civic information</span>
                <span><HeartPulse aria-hidden="true" /> HIPAA-regulated healthcare software</span>
              </div>
            </div>
          </Parallax>
        </section>

        <section className="section skills-section" id="skills">
          <SectionHeading
            eyebrow="Skills"
            title="Tools & Skills"
            copy="A practical toolkit for building, integrating, and shipping software."
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
          <p>I’d love to hear about what you’re building.</p>
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
                {/*<h2 id="project-video-title">Product demo</h2>*/}
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
