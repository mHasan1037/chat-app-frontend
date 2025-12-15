"use client";
import { getUserProfile } from "@/app/services/userService";
import { IUserProfile } from "@/app/types/usertype";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

let action: "NONE" | "ADD" | "UNFRIEND" | "ACCEPT" | "CANCEL" = "NONE";

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

  if (!profile.isMe) {
    if (profile.isFriend) action = "UNFRIEND";
    else if (profile.isIncomingRequest) action = "ACCEPT";
    else if (profile.isOutgoingRequest) action = "CANCEL";
    else action = "ADD";
  }

  return (
    <div key={profile._id} className="flex gap-2">
      <h1>{profile.name}</h1>
      {!profile.isMe && (
        <div>
          {action === "ADD" && <button>Add Friend</button>}
          {action === "UNFRIEND" && <button>Unfriend</button>}
          {action === "ACCEPT" && <button>Accept Request</button>}
          {action === "CANCEL" && <button>Cancel Request</button>}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
