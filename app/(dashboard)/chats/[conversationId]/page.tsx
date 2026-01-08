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
      setMessages((prev) => [...prev, message]);
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
    <div className="flex flex-col h-[80vh]">
      <ChatHeader user={otherUser} />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messagesWithIsMe.map((msg) => (
          <ChatContent content={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSendMessage}/>:
    </div>
  );
};

export default chatPage;
