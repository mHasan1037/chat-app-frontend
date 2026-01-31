"use client";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import { getAllConversations } from "@/app/services/chatService";
import { getSocket } from "@/app/utils/socket";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState<any[]>([]);
  const router = useRouter();
  const myUserId = useAuthUser().data?._id;

  useEffect(() => {
    if (!myUserId) return;

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("🟢 client socket connected:", socket.id);
    });

    socket.emit("joinUser", myUserId);

    getAllConversations().then(setChats);

    const handleConversationUpdated = (updatedChat: any) => {
      setChats((prev) => {
        const filtered = prev.filter((c) => c._id !== updatedChat._id);
        return [updatedChat, ...filtered];
      });
    };

    socket.on("conversationUpdated", handleConversationUpdated);

    socket.on("conversationUpdated", (data) => {
      console.log("📥 conversationUpdated received:", data);
    });

    return () => {
      socket.off("conversationUpdated", handleConversationUpdated);
    };
  }, [myUserId]);

  return (
    <div className="main-content-border">
      <h1 className="text-xl font-bold mb-4">Chats</h1>
      {chats.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => {
            const otherUser = chat.members.find(
              (member: any) => member._id !== myUserId,
            );

            const lastSenderIsMe = chat.lastMessage?.sender === myUserId;

            return (
              <div
                key={chat._id}
                className="p-3 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/chats/${chat._id}`)}
              >
                <p className="font-semibold">{otherUser?.name}</p>
                <p className="text-sm text-gray-500">
                  {chat.lastMessage
                    ? lastSenderIsMe
                      ? `You: ${chat.lastMessage.content}`
                      : `${chat.lastMessage.content}`
                    : "No messages yet"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
