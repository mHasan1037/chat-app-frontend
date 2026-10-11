"use client";
import RandomUsers from "@/app/components/RandomUsers";
import { useFriendMutations } from "@/app/hooks/useFriendMutation";
import { useFriends } from "@/app/hooks/useFriends";
import { useUserSearch } from "@/app/hooks/useUserSearch";
import { createOrGetConversation } from "@/app/services/chatService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FriendPage = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { data: friends = [], isLoading: friendsLoading } = useFriends();
  const { data: searchResults = [] } = useUserSearch(query);
  const friendMutation = useFriendMutations();

  const handleFriendProfile = async (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleMessageUser = async (userId: string) => {
    const convo = await createOrGetConversation(userId);
    router.push(`/chats/${convo._id}`);
  };

  return (
    <div className="main-content-border">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Connections</h1>
      </div>
      <input
        type="text"
        placeholder="Search Friends"
        className="input-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() ? (
        searchResults.length === 0 ? (
          <p className="rounded-2xl bg-white/70 p-5 text-center text-sm font-medium text-slate-500">
            No results found
          </p>
        ) : (
          <RandomUsers
            users={searchResults}
            onFriendAction={(action) => friendMutation.mutate(action)}
            onProfileVisit={handleFriendProfile}
          />
        )
      ) : friendsLoading ? (
        <p className="text-sm font-medium text-slate-500">Loading friends...</p>
      ) : friends.length === 0 ? (
        <div className="rounded-2xl bg-white/70 p-5 text-center text-sm font-medium text-slate-500">
          You have no friends.
        </div>
      ) : (
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm transition hover:bg-white"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="center-position h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-base font-black text-white shadow-lg shadow-blue-500/20">
                  {friend.profilePicture ? (
                    <img
                      src={friend.profilePicture}
                      alt={friend.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    friend.name?.charAt(0)?.toUpperCase()
                  )}
                </div>
                <p
                  onClick={() => handleFriendProfile(friend._id)}
                  className="cursor-pointer truncate font-bold text-slate-800 hover:text-blue-600"
                >
                  {friend.name}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleMessageUser(friend._id)}
                  className="action-btn action-btn-blue"
                >
                  Message
                </button>
                <button
                  onClick={() =>
                    friendMutation.mutate({ type: "UNFRIEND", id: friend._id! })
                  }
                  className="action-btn action-btn-red"
                >
                  Unfriend
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
