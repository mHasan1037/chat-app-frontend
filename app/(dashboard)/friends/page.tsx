"use client";
import RandomUsers from "@/app/components/RandomUsers";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  getAllFriendLists,
  searchUsers,
  sendFriendRequest,
} from "@/app/services/friendRequestService";
import {
  FriendAction,
  IFriendType,
  IUserSearchResult,
} from "@/app/types/friendType";
import React, { useEffect, useState } from "react";

const FriendPage = () => {
  const [allFriends, setAllFriends] = useState<IFriendType[]>([]);
  const [searchResults, setSearchResults] = useState<IUserSearchResult[]>([]);
  const [query, setQuery] = useState("");

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

  const handleFriendAction = async (action: FriendAction) => {
    const { type, id } = action;
    const previousState = searchResults;

    try {
      switch (type) {
        case "ADD":
          const res = await sendFriendRequest(id);
          const requestId = res.request._id;
          setSearchResults((prev) =>
            prev.map((user) =>
              user._id === id 
                ? {
                  ...user,
                  isOutgoingRequest: true,
                  requestId
                }
                : user
            )
          )
          break;
        case "ACCEPT":
          await acceptFriendRequest(id);
          setSearchResults((prev) =>
             prev.map((user) =>
               user.requestId === id
                ? {
                  ...user,
                  isFriend: true,
                  isIncomingRequest: false,
                  isOutgoingRequest: false,
                  requestId: null
                }
                : user
            )
          )
          break;
        case "DECLINE":
          await declineFriendRequest(id);
          setSearchResults((prev) =>
            prev.map((user) =>
               user.requestId === id 
                 ? {
                    ...user,
                    isIncomingRequest: false,
                    requestId: null,
                 }
                 : user
            )
          )
          break;
        case "CANCEL":
          await cancelFriendRequest(id);
          setSearchResults((prev) =>
            prev.map((user) =>
              user.requestId === id
                ? {
                  ...user,
                  isOutgoingRequest: false,
                  requestId: null
                }
                : user
            )
          )
          break;
      }
    } catch (err) {
      console.error(err);
      setSearchResults(previousState);
    }
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
