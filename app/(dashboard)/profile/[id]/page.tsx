"use client";
import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest, sendFriendRequest } from "@/app/services/friendRequestService";
import { getUserProfile } from "@/app/services/userService";
import { IUserProfile } from "@/app/types/usertype";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const { id } = useParams<{ id: string | string[] }>();
  const userId = Array.isArray(id) ? id[0] : id;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const user = await getUserProfile(userId);
        console.log('the user', user);
        setProfile(user);
      } catch (err) {
        setError("User not found");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <div key={profile._id} className="flex gap-2">
      <h1>{profile.name}</h1>
      
      {!profile.isMe && (
        <div>
          {!profile.isFriend &&
          !profile.isIncomingRequest &&
          !profile.isOutgoingRequest && (
            <button onClick={()=> sendFriendRequest(profile._id)}>Add Friend</button>
          )}
          {profile.isIncomingRequest && profile.requestId && (
            <div>
              <button onClick={()=> acceptFriendRequest(profile.requestId)}>Accept</button>
              <button onClick={()=> declineFriendRequest(profile.requestId)}>Decline</button>
            </div>
          )}
          {profile.isOutgoingRequest && profile.requestId && (
            <button onClick={()=> cancelFriendRequest(profile.requestId)}>
              Cancel Request
            </button>
          )}
          {profile.isFriend && <button>Unfriend</button>}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
