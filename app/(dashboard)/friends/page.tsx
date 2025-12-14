"use client";
import RandomUsers from "@/app/components/RandomUsers";
import { useFriendAcions } from "@/app/hooks/useFriendActions";
import {
  getAllFriendLists,
  searchUsers,
} from "@/app/services/friendRequestService";
import {
  IFriendType,
  IUserSearchResult,
} from "@/app/types/friendType";
import React, { useEffect, useState } from "react";

const FriendPage = () => {
  const [allFriends, setAllFriends] = useState<IFriendType[]>([]);
  const [searchResults, setSearchResults] = useState<IUserSearchResult[]>([]);
  const [query, setQuery] = useState("");
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
            />
          )}
        </div>
      ) : (
        <div>
          {allFriends.length === 0 ? (
            <div>You have no friends.</div>
          ) : (
            allFriends.map((friend) => <div>{friend?.name}</div>)
          )}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
