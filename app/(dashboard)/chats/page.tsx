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
    <div className="main-content-border overflow-hidden p-0">
      <div className="border-b border-white/70 bg-white/65 px-5 py-4">
        <h1 className="text-2xl font-black text-slate-950">Chats</h1>
      </div>
      {chats.length === 0 ? (
        <div className="px-5 py-14 text-center text-sm font-medium text-slate-500">No conversations found.</div>
      ) : (
        <div className="divide-y divide-slate-200/70">
          {chats.map((chat) => {
            const otherUser = chat.members.find(
              (member: any) => member._id !== myUserId,
            );

            const lastSenderIsMe = chat.lastMessage?.sender === myUserId;

            return (
              <div
                key={chat._id}
                className="group flex cursor-pointer items-center gap-3 px-5 py-4 transition hover:bg-white/85"
                onClick={() => router.push(`/chats/${chat._id}`)}
              >
                <div className="center-position h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-base font-black text-white shadow-lg shadow-blue-500/20">
                  {otherUser?.name?.charAt(0)?.toUpperCase() ?? "A"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-950 group-hover:text-blue-700">{otherUser?.name}</p>
                  <p className="truncate text-sm font-medium text-slate-500">
                    {chat.lastMessage
                      ? lastSenderIsMe
                        ? `You: ${chat.lastMessage.content}`
                        : `${chat.lastMessage.content}`
                      : "No messages yet"}
                  </p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-0 transition group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
