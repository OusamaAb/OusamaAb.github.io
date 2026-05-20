// Direction B — App shell

const { useEffect: useEffectBA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "accent": "#6e9bff"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#6e9bff",  // cobalt
  "#5fcfb8",  // mint / teal
  "#b685ff",  // violet
  "#ff6b9d"   // magenta
];

function AppB() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const rootRef = window.useRevealB();

  useEffectBA(() => {
    document.documentElement.dataset.theme = t.dark ? "dark" : "light";
  }, [t.dark]);

  useEffectBA(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  useEffectBA(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headerOffset = () => {
      const header = document.querySelector(".top");
      const h = header ? header.getBoundingClientRect().height : 64;
      return h + 20;
    };

    const easeInOutCubic = (x) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    let rafId = 0;
    const animateScrollTo = (targetY, duration = 750) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;
      const startTime = performance.now();
      cancelAnimationFrame(rafId);
      const step = (now) => {
        const t1 = Math.min(1, (now - startTime) / duration);
        const eased = easeInOutCubic(t1);
        window.scrollTo(0, startY + distance * eased);
        if (t1 < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const handleClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - headerOffset();
      const clamped = Math.max(0, targetY);
      if (reduceMotion) {
        window.scrollTo(0, clamped);
      } else {
        const dist = Math.abs(clamped - window.scrollY);
        const duration = Math.min(1100, Math.max(450, dist * 0.55));
        animateScrollTo(clamped, duration);
      }
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <header className="top">
        <div className="brand">
          <span className="brand-mark">
            <img src="/assets/Ousama%20Ai%20pic.png" alt="" />
          </span>
          <span>Ousama Alabdullah</span>
        </div>
        <nav>
          <a href="#about">about</a>
          <a href="#now">now</a>
          <a href="#projects">projects</a>
          <a href="#experience">work</a>
          <a href="#education">education</a>
          <a href="#skills">stack</a>
          <a href="#certs">certs</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="right-cluster">
          <span className="status">
            <span className="dot"></span>
            <span>online · YYZ</span>
          </span>
          <button
            className="theme-btn"
            onClick={() => setTweak("dark", !t.dark)}
            aria-label="Toggle dark mode"
            title={t.dark ? "Switch to light" : "Switch to dark"}
          >
            {t.dark ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <main className="wrap" ref={rootRef}>
        <window.HeroB />
        <window.AboutB />
        <window.NowB />
        <window.ProjectsB />
        <window.ExperienceB />
        <window.EducationB />
        <window.SkillsB />
        <window.CertsB />
        <window.ContactB />

        <footer>
          <span>© 2026 Ousama Alabdullah · Toronto</span>
          <span>Built with Instrument Serif + Space Grotesk</span>
        </footer>
      </main>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme" />
        <window.TweakToggle label="Dark mode" value={t.dark}
                            onChange={(v) => setTweak("dark", v)} />
        <window.TweakColor  label="Accent" value={t.accent}
                            options={ACCENT_OPTIONS}
                            onChange={(v) => setTweak("accent", v)} />
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppB />);
