"use client";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "@/app/services/friendRequestService";
import { useFriendRequestStore } from "@/app/store/friendRequestStore";
import React, { useEffect } from "react";

const FriendRequests = () => {
  const { requests, fetchRequests } = useFriendRequestStore();
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAcceptRequest = async (id: string) => {
    try {
      await acceptFriendRequest(id);
      await fetchRequests();
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  const handleDeclineRequest = async (id: string) => {
    try {
      await declineFriendRequest(id);
      await fetchRequests();
    } catch (err: any) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>FriendRequests</h1>
      {requests.length === 0 ? (
        <div>You have no friend requests</div>
      ) : (
        <div>
          {requests.map((req) => (
            <div className="flex" key={req._id}>
              <p>{req.from.name}</p>
              <button onClick={() => handleAcceptRequest(req._id)}>
                Accept
              </button>
              <button onClick={() => handleDeclineRequest(req._id)}>
                Decline
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
