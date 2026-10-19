import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (disabled) return;
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-3 border-t border-white/70 bg-white/80 p-3 backdrop-blur-xl">
      <input
        className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault;
            handleSend();
          }
        }}
        disabled={disabled}
        placeholder="Type a message"
      />
      <button
        onClick={handleSend}
        className={`btn-primary rounded-full px-5 text-sm font-bold ${disabled && 'cursor-not-allowed opacity-50'}`}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
