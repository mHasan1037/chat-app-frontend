"use client";
import RandomUsers from "@/app/components/RandomUsers";
import { useFriendAcions } from "@/app/hooks/useFriendActions";
import { getAllFriendLists } from "@/app/services/friendRequestService";
import { searchUsers } from "@/app/services/userService";
import { IFriendType, IUserSearchResult } from "@/app/types/friendType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FriendPage = () => {
  const [allFriends, setAllFriends] = useState<IFriendType[]>([]);
  const [searchResults, setSearchResults] = useState<IUserSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { handleFriendAction } = useFriendAcions(
    searchResults,
    setSearchResults
  );

  useEffect(() => {
    const fetchAllFriendList = async () => {
      const request = await getAllFriendLists();
      setAllFriends(request);
    };
    fetchAllFriendList();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      const results = await searchUsers(query);
      setSearchResults(results);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleFriendProfile = async (id: string) =>{
      router.push(`/profile/${id}`)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Friends"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() ? (
        <div>
          {searchResults.length === 0 ? (
            <p>No results found</p>
          ) : (
            <RandomUsers
              users={searchResults}
              onFriendAction={handleFriendAction}
              onProfileVisit={handleFriendProfile}
            />
          )}
        </div>
      ) : (
        <div>
          {allFriends.length === 0 ? (
            <div>You have no friends.</div>
          ) : (
            allFriends.map((friend) => <div key={friend._id} onClick={()=> handleFriendProfile(friend._id)}>{friend?.name}</div>)
          )}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
