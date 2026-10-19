"use client";
import ChatContent from "@/app/components/ChatContent";
import ChatHeader from "@/app/components/ChatHeader";
import ChatInput from "@/app/components/ChatInput";
import { useAIChat } from "@/app/hooks/useAIChat";
import { isAxiosError } from "axios";
import React, { useState } from "react";

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  isSystem?: boolean;
};

const AIChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const { mutateAsync, isPending } = useAIChat();

  const addNotice = (content: string) =>
    setMessages((prev) => [...prev, { role: "assistant", content, isSystem: true }]);

  const handleSendMessage = async (text: string) => {
    const apiMessages = [
      ...messages.filter((m) => !m.isSystem),
      { role: "user" as const, content: text },
    ].map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await mutateAsync(apiMessages);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (error: any) {
      if (isAxiosError(error) && error.response?.status === 429) {
        const { code, error: message } = error.response.data ?? {};

        if (code === "DAILY_LIMIT_REACHED") {
          setDailyLimitReached(true);
          addNotice(message ?? "You've finished your daily chat limit. Please come back tomorrow.");
        } else {
          // RATE_LIMITED (burst): temporary, so don't lock the input
          addNotice(message ?? "You're sending messages too fast. Please wait a moment.");
        }
        return;
      }

      console.error("AI request failed", error);
      addNotice("⚠️ AI service is currently unavailable. The developer doesn't have money to pay for an AI model.");
    }
  };

  const messagesWithIsMe = messages.map((m, i) => ({
    _id: String(i),
    isMe: m.role === "user",
    content: m.content,
    isNotice: m.isSystem ?? false,
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
      <ChatInput onSend={handleSendMessage} disabled={dailyLimitReached || isPending} />
    </div>
  );
};

export default AIChat;
