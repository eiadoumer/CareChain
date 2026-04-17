import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { cx } from "../utils";
import { Card } from "./ui";

export default function ChatPanel({
  title = "Ask CareChain Assistant",
  subtitle,
  initialMessages = [],
  replyMessage,
  placeholder = "Type a message...",
  accent = "blue",
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse =
        replyMessage ||
        "I understand your concern. Based on your current medications, please monitor for any unusual symptoms. If they persist, please contact your care team or press the emergency button.";
      setMessages((prev) => [
        ...prev,
        { role: "ai", name: accent === "green" ? "Nurse Layal" : undefined, text: aiResponse },
      ]);
    }, 1000);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const headerAccent = accent === "green" ? "from-emerald-500 to-teal-600" : "from-blue-500 to-indigo-600";

  return (
    <Card className="p-0 overflow-hidden">
      <div className={cx("bg-gradient-to-r text-white px-5 py-4 flex items-center gap-3", headerAccent)}>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
          {accent === "green" ? <MessageCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-white/80">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-white/20 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
          Online
        </div>
      </div>

      <div className="h-80 overflow-y-auto px-5 py-4 bg-slate-50 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={cx("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cx(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-slate-800 border border-slate-100 rounded-bl-sm"
              )}
            >
              {m.name && <div className="text-xs font-semibold text-emerald-600 mb-0.5">{m.name}</div>}
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={sendMessage}
          className="rounded-lg px-4 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </Card>
  );
}
