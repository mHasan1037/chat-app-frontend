"use client";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import {
  getMessagesByConversationId,
  sendMessage,
} from "@/app/services/chatService";
import { getSocket } from "@/app/utils/socket";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const chatPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
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

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.off("newMessage", handleNewMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!text.trim() || !conversationId) return;

    await sendMessage(conversationId, text);
    setText("");
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messagesWithIsMe.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`max-w-xs p-2 rounded ${
                msg.isMe ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex p-3 border-t">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) =>{
            if(e.key === "Enter"){
              e.preventDefault;
              handleSendMessage()
            }
          }}
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default chatPage;
