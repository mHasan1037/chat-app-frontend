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
      <input
        type="text"
        placeholder="Search Friends"
        className="mb-3 border w-full p-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() ? (
        searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <RandomUsers
            users={searchResults}
            onFriendAction={(action) => friendMutation.mutate(action)}
            onProfileVisit={handleFriendProfile}
          />
        )
      ) : friendsLoading ? (
        <p>Loading friends...</p>
      ) : friends.length === 0 ? (
        <div>You have no friends.</div>
      ) : (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="flex justify-between gap-1 hover:bg-gray-50 mb-1"
          >
            <p
              onClick={() => handleFriendProfile(friend._id)}
              className="cursor-pointer text-gray-800"
            >
              {friend.name}
            </p>
            <div className="flex gap-2">
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
        ))
      )}
    </div>
  );
};

export default FriendPage;
