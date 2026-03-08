import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex p-3 border-t border-color">
      <input
        className="flex-1 border rounded px-3 py-2 border-color"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault;
            handleSend();
          }
        }}
        placeholder="Type a message"
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-600 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
