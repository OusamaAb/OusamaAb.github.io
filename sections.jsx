// Direction B — Sections

const { useState: useStateBS, useEffect: useEffectBS, useRef: useRefBS } = React;

function useRevealB() {
  const ref = useRefBS(null);
  useEffectBS(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function HeroIntroB() {
  return (
    <div className="panel hero-intro">
      <div className="hero-availability">
        <span className="dot"></span>
        <span>Open to new-grad roles · 2026</span>
      </div>
      <h1 className="hero-name">
        Ousama Alabdullah<br/>
        Software Engineer<br/>
        <em>Problem Solver</em>
      </h1>
      <p className="hero-lede">
        Toronto-based, TMU Software Engineering '26. I promise I'm a fun guy. Thanks
        for stopping by, and I'd love to stay in touch.
      </p>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="v"><em>6</em></div>
          <div className="k">Major projects</div>
        </div>
        <div className="hero-stat">
          <div className="v"><em>2</em></div>
          <div className="k">Internships</div>
        </div>
        <div className="hero-stat">
          <div className="v"><em>2</em></div>
          <div className="k">AWS certs</div>
        </div>
      </div>
    </div>
  );
}

function HeroB() {
  return (
    <div className="hero">
      <HeroIntroB />
      <window.HeroChatB />
    </div>
  );
}

function AboutB() {
  const O = window.OUSAMA;
  return (
    <section id="about" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 01 — About</div>
          <h2 className="panel-title">The person behind the code.</h2>
        </div>
      </div>
      <div className="grid lead">
        <div className="about-card">
          {O.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div>
          <image-slot
            shape="rounded"
            radius="16"
            src="/assets/Ousama%20Portfolio%20Picture.jpg"
            alt="Ousama Alabdullah"
            position="50% 25%"
            style={{ display: "block", width: "100%", aspectRatio: "1 / 1" }}
          ></image-slot>
        </div>
      </div>
    </section>
  );
}

function NowB() {
  const O = window.OUSAMA;
  const today = new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  return (
    <section id="now" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 02 — Right now</div>
          <h2 className="panel-title">What's on the bench.</h2>
        </div>
        <div className="kicker">Last updated · {today}</div>
      </div>
      <div className="now-log">
        {O.now.map((n, i) => (
          <div key={i} className="row">
            <div className="time">[{String(i + 1).padStart(2, "0")}:00]</div>
            <div className="txt">{n}{i === O.now.length - 1 && <span className="now-blink"></span>}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROJECT_CYCLE_MS = 7000;
const PROJECT_PAUSE_MS = 30000;

function ProjectsB() {
  const O = window.OUSAMA;
  const [activeId, setActiveId] = useStateBS(O.projects[0].id);
  const [paused, setPaused] = useStateBS(false);
  const [pauseTick, setPauseTick] = useStateBS(0);
  const [cycleTick, setCycleTick] = useStateBS(0);
  const active = O.projects.find(p => p.id === activeId) || O.projects[0];

  useEffectBS(() => {
    if (paused) return undefined;
    const t = window.setTimeout(() => {
      const idx = O.projects.findIndex(p => p.id === activeId);
      const nextIdx = (idx + 1) % O.projects.length;
      setActiveId(O.projects[nextIdx].id);
      setCycleTick(c => c + 1);
    }, PROJECT_CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [activeId, paused, cycleTick]);

  useEffectBS(() => {
    if (!paused) return undefined;
    const t = window.setTimeout(() => {
      setPaused(false);
      setCycleTick(c => c + 1);
    }, PROJECT_PAUSE_MS);
    return () => window.clearTimeout(t);
  }, [paused, pauseTick]);

  const handleSelect = (id) => {
    setPauseTick(t => t + 1);
    setPaused(true);
    if (id === activeId) return;
    setActiveId(id);
    setCycleTick(c => c + 1);
  };

  return (
    <section id="projects" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 03 — Projects</div>
          <h2 className="panel-title">Things I've shipped.</h2>
        </div>
      </div>
      <div className="grid proj">
        <div className="proj-list">
          {O.projects.map((p, i) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                className="proj-list-item"
                data-active={isActive ? "1" : "0"}
                onClick={() => handleSelect(p.id)}
              >
                <div className="pli-row1">
                  <h4>{p.title}</h4>
                  <span className="num">№ {String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="pli-tag">{p.tag} · {p.year}</div>
                {isActive && !paused && (
                  <span
                    key={cycleTick}
                    className="pli-progress"
                    style={{ animationDuration: `${PROJECT_CYCLE_MS}ms` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
        <article
          key={active.id}
          className="proj-detail-card"
          aria-live="polite"
        >
          <div className="pd-year">{active.year} · {active.tag}</div>
          <h3>{active.title}</h3>
          <p className="pd-blurb">{active.blurb}</p>
          <ul className="pd-bullets">
            {active.detail.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <div className="pd-stack">
            {active.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
          <div className="pd-links">
            {(active.links || (active.link ? [{ label: "GitHub", href: active.link }] : [])).map((l) => (
              <a key={l.href} className="pd-link" href={l.href} target="_blank" rel="noreferrer">
                {l.label} →
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function ExperienceB() {
  const O = window.OUSAMA;
  return (
    <section id="experience" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 04 — Experience</div>
          <h2 className="panel-title">Where I've been.</h2>
        </div>
      </div>
      <div className="timeline">
        {O.experience.map((e, i) => (
          <div key={i} className="tl-row">
            <div className="when">{e.dates}</div>
            <div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationB() {
  const O = window.OUSAMA;
  const [activeCourse, setActiveCourse] = useStateBS(null);

  useEffectBS(() => {
    if (!activeCourse) return;
    const onKey = (e) => { if (e.key === "Escape") setActiveCourse(null); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCourse]);

  const buildQuestion = (course, kind, item) => {
    const label = `${course.code}, ${course.name}`;
    if (kind === "theory") {
      return `Can you go deeper on this concept from ${label}: ${item}`;
    }
    if (kind === "labs") {
      return `Tell me more about ${item} (from ${label}).`;
    }
    if (kind === "projects") {
      const colonAt = item.indexOf(":");
      const name = colonAt > 0 && colonAt < 60 ? item.slice(0, colonAt).trim() : null;
      if (name) {
        return `Tell me more about Ousama's ${name} project from ${label}.`;
      }
      return `Tell me more about Ousama's project from ${label}.`;
    }
    return item;
  };

  const askAbout = (course, kind, item) => {
    const question = buildQuestion(course, kind, item);
    setActiveCourse(null);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("ousama:ask", { detail: { question } }));
      const chatEl = document.querySelector(".hero-chat");
      if (chatEl) {
        chatEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  const renderAskList = (kind, items) => (
    <ul className="course-ask-list">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            className="course-ask-item"
            onClick={() => askAbout(activeCourse, kind, item)}
            aria-label={`Ask the chatbot about: ${item}`}
            title="Ask the chatbot about this"
          >
            <span className="ask-text">{item}</span>
            <span className="ask-cta" aria-hidden="true">Ask AI →</span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="education" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 05 — Education</div>
          <h2 className="panel-title">School & syllabus.</h2>
        </div>
      </div>
      <div className="edu-line">
        <div>
          <h3>{O.education.school}</h3>
          <div className="deg">{O.education.degree}</div>
        </div>
        <div className="grad">Class of {O.education.grad}</div>
      </div>
      <div className="kicker" style={{ marginBottom: 12 }}>Coursework · tap a course for details</div>
      <div className="edu-courses">
        {O.education.coursework.map(c => (
          <button
            key={c.code}
            type="button"
            className="tag edu-course"
            onClick={() => setActiveCourse(c)}
            aria-haspopup="dialog"
          >
            {c.name}
          </button>
        ))}
      </div>

      {activeCourse && ReactDOM.createPortal(
        <div
          className="course-overlay"
          onClick={() => setActiveCourse(null)}
          role="presentation"
        >
          <div
            className="course-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="course-close"
              onClick={() => setActiveCourse(null)}
              aria-label="Close course details"
            >
              ×
            </button>
            <div className="course-head">
              <div className="kicker">{activeCourse.code} · {activeCourse.term}</div>
              <h3 id="course-modal-title">{activeCourse.name}</h3>
              <p className="course-blurb">{activeCourse.blurb}</p>
            </div>
            <div className="course-sections">
              {activeCourse.theory && activeCourse.theory.length > 0 && (
                <section>
                  <div className="cs-title">Theory · tap any topic to ask the chatbot</div>
                  {renderAskList("theory", activeCourse.theory)}
                </section>
              )}
              {activeCourse.labs && activeCourse.labs.length > 0 && (
                <section>
                  <div className="cs-title">Labs · tap any lab to ask the chatbot</div>
                  {renderAskList("labs", activeCourse.labs)}
                </section>
              )}
              {activeCourse.projects && activeCourse.projects.length > 0 && (
                <section>
                  <div className="cs-title">
                    {activeCourse.projects.length > 1 ? "Projects" : "Project"} · tap to ask the chatbot
                  </div>
                  {renderAskList("projects", activeCourse.projects)}
                </section>
              )}
              {activeCourse.tools && activeCourse.tools.length > 0 && (
                <section>
                  <div className="cs-title">Tools</div>
                  <div className="cs-tags">
                    {activeCourse.tools.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

function SkillsB() {
  const O = window.OUSAMA;
  return (
    <section id="skills" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 06 — Stack</div>
          <h2 className="panel-title">The toolkit.</h2>
        </div>
      </div>
      <div className="skill-grid">
        {Object.entries(O.skills).map(([cat, items]) => (
          <div key={cat} className="skill-card">
            <div className="cat">{cat}</div>
            <div className="items">
              {items.map(it => <span key={it} className="tag">{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertsB() {
  const O = window.OUSAMA;
  return (
    <section id="certs" className="panel reveal" style={{ marginBottom: 24 }}>
      <div className="panel-head">
        <div>
          <div className="kicker"><span className="marker">●</span> 07 — Certifications</div>
          <h2 className="panel-title">Paper to back it up.</h2>
        </div>
      </div>
      <div className="cert-grid">
        {O.certs.map((c, i) => (
          <div key={i} className="cert-card">
            <h3>{c.name}</h3>
            <div className="org">{c.org}</div>
            <div className="when">Issued {c.date} → Expires {c.exp}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactB() {
  const O = window.OUSAMA;
  const [showResume, setShowResume] = useStateBS(false);
  const resumeUrl = "/assets/Ousama_Alabdullah_Resume_May2026%20(1).pdf";

  useEffectBS(() => {
    if (!showResume) return;
    const onKey = (e) => { if (e.key === "Escape") setShowResume(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showResume]);

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(O.email);

  return (
    <section id="contact" className="panel contact-card reveal">
      <h2>Reach out.<br/>Let's <em>have a chat!</em></h2>
      <a className="email" href={gmailComposeUrl} target="_blank" rel="noreferrer">{O.email}</a>
      <div className="lines">
        <a href={O.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={O.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={gmailComposeUrl} target="_blank" rel="noreferrer">Email →</a>
      </div>
      <button
        type="button"
        className="resume-btn"
        onClick={() => setShowResume(true)}
        aria-haspopup="dialog"
      >
        View Resume →
      </button>

      {showResume && ReactDOM.createPortal(
        <div
          className="resume-overlay"
          onClick={() => setShowResume(false)}
          role="presentation"
        >
          <div
            className="resume-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Ousama Alabdullah resume"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-toolbar">
              <span className="resume-title">Resume · Ousama Alabdullah</span>
              <div className="resume-actions">
                <a className="resume-action" href={resumeUrl} target="_blank" rel="noreferrer">
                  Open in new tab
                </a>
                <a className="resume-action" href={resumeUrl} download="Ousama_Alabdullah_Resume.pdf">
                  Download
                </a>
                <button
                  type="button"
                  className="resume-close"
                  onClick={() => setShowResume(false)}
                  aria-label="Close resume viewer"
                >
                  ×
                </button>
              </div>
            </div>
            <iframe
              className="resume-frame"
              src={resumeUrl}
              title="Ousama Alabdullah resume"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

Object.assign(window, {
  HeroB, AboutB, NowB, ProjectsB, ExperienceB, EducationB, SkillsB, CertsB, ContactB, useRevealB
});
