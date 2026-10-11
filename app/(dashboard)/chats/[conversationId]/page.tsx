"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import {
  getConversationById,
  getMessagesByConversationId,
  sendMessage,
} from "@/app/services/chatService";
import { getSocket } from "@/app/utils/socket";
import { useParams } from "next/navigation";
import ChatHeader from "@/app/components/ChatHeader";
import ChatContent from "@/app/components/ChatContent";
import ChatInput from "@/app/components/ChatInput";

const chatPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const myUserId = useAuthUser().data?._id;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messagesWithIsMe = messages.map((msg) => ({
    ...msg,
    isMe: msg.sender._id === myUserId,
  }));


  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const atBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();

    socket.emit("joinConversation", conversationId);

    getMessagesByConversationId(conversationId).then(setMessages);
    getConversationById(conversationId).then(setConversation);

    const handleNewMessage = (message: any) => {
      const normalized = {
        ...message,
        sender: 
         typeof message.sender === 'string'
            ? {_id: message.sender}
            : message.sender,
      };
      setMessages((prev) => [...prev, normalized]);
    };

    socket.off("newMessage", handleNewMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  const handleSendMessage = async (message: string) => {
    if (!conversationId) return;
    await sendMessage(conversationId, message);
  };

  const otherUser = conversation?.members?.find((m: any) => m._id !== myUserId);

  return (
    <div className="main-content-border flex h-[78vh] max-w-3xl flex-col overflow-hidden p-0">
      <ChatHeader user={otherUser} />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50/80 to-blue-50/60 p-4 sm:p-5"
      >
        {messagesWithIsMe.map((msg) => (
          <ChatContent key={msg._id} content={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSendMessage}/>:
    </div>
  );
};

export default chatPage;

