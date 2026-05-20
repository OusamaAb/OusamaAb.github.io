const { useState: useStateTweaks, useEffect: useEffectTweaks } = React;

const TWEAKS_STORAGE_KEY = "ousama:tweaks";
const TWEAKS_COLLAPSED_KEY = "ousama:tweaks:collapsed";

function useTweaks(defaults) {
  const [values, setValues] = useStateTweaks(() => {
    try {
      const raw = localStorage.getItem(TWEAKS_STORAGE_KEY);
      if (raw) return { ...defaults, ...JSON.parse(raw) };
    } catch (e) {}
    return defaults;
  });

  useEffectTweaks(() => {
    try {
      localStorage.setItem(TWEAKS_STORAGE_KEY, JSON.stringify(values));
    } catch (e) {}
  }, [values]);

  const setTweak = (key, value) => {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  };

  return [values, setTweak];
}

function TweaksPanel({ title, children }) {
  const [collapsed, setCollapsed] = useStateTweaks(() => {
    try {
      return localStorage.getItem(TWEAKS_COLLAPSED_KEY) === "1";
    } catch (e) {
      return false;
    }
  });

  useEffectTweaks(() => {
    try {
      localStorage.setItem(TWEAKS_COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch (e) {}
  }, [collapsed]);

  const label = title || "Tweaks";

  return (
    <aside
      className={"tweaks-panel" + (collapsed ? " collapsed" : "")}
      aria-label={label}
    >
      <button
        type="button"
        className="tweaks-toggle"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="tweaks-body"
        title={collapsed ? "Open tweaks" : "Minimize tweaks"}
      >
        <span>{label}</span>
        <span className="tweaks-chev" aria-hidden="true">▾</span>
      </button>
      {!collapsed && (
        <div id="tweaks-body" className="tweaks-body">
          {children}
        </div>
      )}
    </aside>
  );
}

function TweakSection({ label }) {
  return <div className="tweak-section">{label}</div>;
}

function TweakToggle({ label, value, onChange }) {
  return (
    <label className="tweak-row">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function TweakColor({ label, value, options, onChange }) {
  return (
    <div className="tweak-row">
      <span>{label}</span>
      <div className="tweak-colors">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="tweak-swatch"
            aria-label={`Use accent ${option}`}
            data-active={option === value ? "1" : "0"}
            style={{ background: option }}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakToggle,
  TweakColor
});
