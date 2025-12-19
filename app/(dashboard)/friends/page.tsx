"use client";
import RandomUsers from "@/app/components/RandomUsers";
import { useFriendMutations } from "@/app/hooks/useFriendMutation";
import { useFriends } from "@/app/hooks/useFriends";
import { useUserSearch } from "@/app/hooks/useUserSearch";
import { getAllFriendLists } from "@/app/services/friendRequestService";
import { searchUsers } from "@/app/services/userService";
import { IFriendType, IUserSearchResult } from "@/app/types/friendType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FriendPage = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { data: friends = [], isLoading: friendsLoading } = useFriends();
  const { data: searchResults = [] } = useUserSearch(query);
  const friendMutation = useFriendMutations();

  const handleFriendProfile = async (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div>
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
          <div key={friend._id} onClick={() => handleFriendProfile(friend._id)}>
            {friend.name}
          </div>
        ))
      )}
    </div>
  );
};

export default FriendPage;
