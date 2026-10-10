"use client";
import ChatContent from "@/app/components/ChatContent";
import ChatHeader from "@/app/components/ChatHeader";
import ChatInput from "@/app/components/ChatInput";
import { useAIChat } from "@/app/hooks/useAIChat";
import React, { useState } from "react";

const AIChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const { mutateAsync, isPending } = useAIChat();

  const handleSendMessage = async (text: string) => {
    const updatedMessage = [...messages, { role: "user", content: text }];
    setMessages(updatedMessage);

    try {
      const res = await mutateAsync(updatedMessage);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (error: any) {
      console.error("AI request failed", error);

      setMessages((prev) =>[
        ...prev,
        {
          role: "assistant",
          content: "⚠️ AI service is currently unavailable. The developer doesn’t have money to pay for an AI model."
        }
      ])
    }
  };

  const messagesWithIsMe = messages.map((m, i) => ({
    _id: String(i),
    isMe: m.role === "user",
    content: m.content,
  }));

  return (
    <div className="main-content-border flex h-[78vh] max-w-3xl flex-col overflow-hidden p-0">
      <ChatHeader user={{ name: "AI Assistant" }} />
      <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50/80 to-cyan-50/70 p-4 sm:p-5">
        {messagesWithIsMe.map((msg) => (
          <ChatContent key={msg._id} content={msg} />
        ))}
        {isPending && (
          <div className="mr-auto rounded-2xl rounded-bl-md border border-white/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-slate-500 shadow-sm">
            AI is thinking...
          </div>
        )}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default AIChat;
