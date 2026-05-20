const { useEffect: useEffectChat, useState: useStateChat } = React;

const CHAT_API_ERROR =
  "I could not reach the portfolio chat API. Please try again shortly.";
const CHAT_SESSION_STORAGE_KEY = "ousama_portfolio_chat_session";
const CHAT_API_URL = window.OUSAMA_CHAT_API_URL || "/api/chat";

const STARTER_QUESTIONS = [
  "Tell me a bit about Ousama.",
  "Tell me about Ousama's projects.",
  "What backend experience does he have?",
  "What did he do at the Ministry of Transportation?",
  "Why is he a strong software engineering candidate?",
  "How would you describe Ousama's personality?",
  "What does Ousama do for fun?"
];

function TypingDots() {
  return (
    <span className="typing-dots" aria-label="Typing">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

function getChatSessionId() {
  try {
    const existing = window.sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY);

    if (existing) {
      return existing;
    }

    const sessionId =
      window.crypto?.randomUUID?.() ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

    window.sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, sessionId);
    return sessionId;
  } catch {
    return "browser-session";
  }
}

function useOusamaChat({ greeting }) {
  const [messages, setMessages] = useStateChat([
    { role: "assistant", content: greeting }
  ]);
  const [pending, setPending] = useStateChat(false);
  const [disabledUntil, setDisabledUntil] = useStateChat(0);
  const [clock, setClock] = useStateChat(Date.now());
  const cooldownSeconds = Math.max(0, Math.ceil((disabledUntil - clock) / 1000));
  const disabled = cooldownSeconds > 0;

  useEffectChat(() => {
    if (!disabledUntil) return undefined;

    const timer = window.setInterval(() => {
      setClock(Date.now());
    }, 250);

    return () => window.clearInterval(timer);
  }, [disabledUntil]);

  const send = async (content) => {
    const question = content.trim();
    if (!question || pending || disabledUntil > Date.now()) return;

    setMessages((current) => [...current, { role: "user", content: question }]);
    setPending(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Portfolio-Chat-Session": getChatSessionId()
        },
        body: JSON.stringify({ message: question })
      });

      if (response.ok) {
        const data = await response.json();
        const followUps = Array.isArray(data.follow_up_questions)
          ? data.follow_up_questions.filter((item) => typeof item === "string" && item.trim())
          : [];

        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.answer || "I don't have enough information about that from Ousama's portfolio content.",
            suggestions: followUps
          }
        ]);
        return;
      }
      
      const data = await response.json().catch(() => ({}));
      const retryAfterSeconds = Number(
        data.retry_after_seconds || response.headers.get("Retry-After")
      );

      if ((response.status === 409 || response.status === 429) && Number.isFinite(retryAfterSeconds)) {
        setClock(Date.now());
        setDisabledUntil(Date.now() + retryAfterSeconds * 1000);
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.error || CHAT_API_ERROR,
          error: true
        }
      ]);
      return;
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: CHAT_API_ERROR,
          error: true
        }
      ]);
    } finally {
      setPending(false);
    }
  };

  const reset = () => {
    setMessages([{ role: "assistant", content: greeting }]);
  };

  return {
    messages,
    pending,
    disabled,
    cooldownSeconds,
    send,
    reset,
    starters: STARTER_QUESTIONS
  };
}

Object.assign(window, { TypingDots, useOusamaChat });
