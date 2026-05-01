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
    <div className="flex flex-col h-[80vh] main-content-border">
      <ChatHeader user={{ name: "AI Assistant" }} />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messagesWithIsMe.map((msg) => (
          <ChatContent key={msg._id} content={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default AIChat;
