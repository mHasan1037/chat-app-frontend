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
  }

  return (
    <div className="main-content-border">
      <input
        type="text"
        placeholder="Search Friends"
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
          <div key={friend._id} className="flex gap-1">
            <p onClick={() => handleFriendProfile(friend._id)}>{friend.name}</p>
            <button onClick={()=> handleMessageUser(friend._id)}>Message</button>
            <button onClick={()=> friendMutation.mutate({type: 'UNFRIEND', id: friend._id!})}>Unfriend</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendPage;
