"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import {
  getMessagesByConversationId,
  sendMessage,
} from "@/app/services/chatService";
import { getSocket } from "@/app/utils/socket";
import { useParams } from "next/navigation";
import ChatContent from "@/app/components/ChatContent";
import ChatInput from "@/app/components/ChatInput";

const chatPage = () => {
  const params = useParams();
  const conversationId = Array.isArray(params?.conversationId)
    ? params.conversationId[0]
    : params?.conversationId;
  const [messages, setMessages] = useState<any[]>([]);
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
    if (!myUserId) return;
    const socket = getSocket();
    socket.emit("joinUser", myUserId);
  }, [myUserId]);

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!conversationId || !myUserId) return;

    const socket = getSocket();

    socket.emit("joinConversation", conversationId);

    getMessagesByConversationId(conversationId).then(setMessages);

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.off("newMessage", handleNewMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId, myUserId]);


  const handleSendMessage = async (message: string) => {
    if (!conversationId) return;
    await sendMessage(conversationId, message);
  };

  return (
    <div className="flex flex-col h-[80vh] relative">
      {/* <IncomingCallPopup onAccept={acceptCall} onReject={rejectCall} /> */}
      {/* <ChatHeader
          user={otherUser}
          onAudioCall={startAudioCall}
          onVideoCall={startVideoCall}
        /> */}
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
      <ChatInput onSend={handleSendMessage} />:
    </div>
  );
};

export default chatPage;
