"use client";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import {
  getMessagesByConversationId,
  sendMessage,
} from "@/app/services/chatService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const chatPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const myUserId = useAuthUser().data?._id;

  useEffect(() => {
    if (!conversationId) return;
    getMessagesByConversationId(conversationId).then(setMessages);
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!text.trim() || !conversationId) return;

    const newMessage = await sendMessage(conversationId, text);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setText("");
  };

  const messagesWithIsMe = messages.map((msg) =>({
    ...msg,
    isMe: msg.sender._id === myUserId
  }))

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
      </div>

      <div className="flex p-3 border-t">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
