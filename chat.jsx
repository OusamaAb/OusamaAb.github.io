// Direction B — Hero chat (embedded, primary surface)

const { useState: useStateBC, useEffect: useEffectBC, useRef: useRefBC } = React;

function HeroChatB() {
  const { messages, pending, disabled, cooldownSeconds, send, reset, starters } = window.useOusamaChat({
    greeting: "Hey, ask me anything about Ousama. You can ask about his projects, the work he did at MTO, what he's building now, or anything else you'd want to know before reaching out."
  });
  const [draft, setDraft] = useStateBC("");
  const scrollRef = useRefBC(null);
  const inputRef = useRefBC(null);
  const stickToBottom = useRefBC(true);
  const sendRef = useRefBC(send);

  useEffectBC(() => {
    sendRef.current = send;
  });

  useEffectBC(() => {
    const onAsk = (event) => {
      const question = event?.detail?.question;
      if (typeof question !== "string" || !question.trim()) return;
      stickToBottom.current = true;
      sendRef.current(question);
    };
    window.addEventListener("ousama:ask", onAsk);
    return () => window.removeEventListener("ousama:ask", onAsk);
  }, []);

  const handleBodyScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottom.current = distance < 80;
  };

  useEffectBC(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (stickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, pending]);

  const submit = (e) => {
    e?.preventDefault();
    if (!draft.trim() || pending || disabled) return;
    stickToBottom.current = true;
    send(draft);
    setDraft("");
  };

  const sendSuggestion = (question) => {
    if (pending || disabled) return;
    stickToBottom.current = true;
    send(question);
  };

  return (
    <div className="panel hero-chat">
      <div className="hc-head">
        <div className="hc-left">
          <image-slot
            shape="circle"
            src="/assets/Ousama%20Ai%20pic.png"
            alt="Portfolio assistant avatar"
            class="hc-avatar-slot"
            style={{ display: "block", width: "38px", height: "38px", flexShrink: 0 }}
          ></image-slot>
          <div>
            <div className="hc-name">Chat about Ousama</div>
            <div className="hc-sub">portfolio assistant · ask anything</div>
          </div>
        </div>
        <button className="hc-restart" onClick={reset} title="Start over">↻</button>
      </div>

      <div className="hc-body" ref={scrollRef} onScroll={handleBodyScroll}>
        {messages.map((m, i) => (
          <div key={i} className={"hc-msg " + m.role + (m.error ? " error" : "")}>
            {m.role === "assistant" && (
              <image-slot
                shape="circle"
                src="/assets/Ousama%20Ai%20pic.png"
                alt="Portfolio assistant avatar"
                class="hc-ava-slot"
                style={{ display: "block", width: "28px", height: "28px", flexShrink: 0, marginTop: "4px" }}
              ></image-slot>
            )}
            <div className="hc-msg-stack">
              <div className="bub">{m.content}</div>
              {m.role === "assistant" && Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                <div className="hc-followups" aria-label="Suggested follow-up questions">
                  {m.suggestions.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => sendSuggestion(question)}
                      disabled={pending || disabled}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {pending && (
          <div className="hc-msg assistant">
            <image-slot
              shape="circle"
              src="/assets/Ousama%20Ai%20pic.png"
              alt="Portfolio assistant avatar"
              class="hc-ava-slot"
              style={{ display: "block", width: "28px", height: "28px", flexShrink: 0, marginTop: "4px" }}
            ></image-slot>
            <div className="hc-msg-stack">
              <div className="bub"><window.TypingDots /></div>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && !pending && (
        <div className="hc-starters">
          {starters.map((s, i) => (
            <button key={i} onClick={() => send(s)} disabled={disabled}>{s}</button>
          ))}
        </div>
      )}

      <form className="hc-input" onSubmit={submit}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={cooldownSeconds > 0 ? `Please wait ${cooldownSeconds}s...` : "Ask about Ousama..."}
          disabled={pending || disabled}
        />
        <button type="submit" disabled={pending || disabled || !draft.trim()}>
          Send <kbd>↵</kbd>
        </button>
      </form>
    </div>
  );
}

window.HeroChatB = HeroChatB;
