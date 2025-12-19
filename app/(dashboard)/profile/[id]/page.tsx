"use client";
import { useFriendMutations } from "@/app/hooks/useFriendMutation";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useParams } from "next/navigation";

const UserProfile = () => {
  const { id } = useParams<{ id: string | string[] }>();
  const userId = Array.isArray(id) ? id[0] : id;
  const { data: profile, isLoading, isError } = useUserProfile(userId);
  const friendMutation = useFriendMutations();

  if (isLoading) return <p>Loading profile...</p>;
  if (isError || !profile) return <p>User not found</p>;

  return (
    <div key={profile._id} className="flex gap-2">
      <h1>{profile.name}</h1>

      {!profile.isMe && (
        <div>
          {!profile.isFriend &&
            !profile.isIncomingRequest &&
            !profile.isOutgoingRequest && (
              <button
                onClick={() =>
                  friendMutation.mutate({ type: "ADD", id: profile._id })
                }
              >
                Add Friend
              </button>
            )}
          {profile.isIncomingRequest && profile.requestId && (
            <div>
              <button
                onClick={() =>
                  friendMutation.mutate({
                    type: "ACCEPT",
                    id: profile.requestId!,
                  })
                }
              >
                Accept
              </button>
              <button
                onClick={() =>
                  friendMutation.mutate({
                    type: "DECLINE",
                    id: profile.requestId!,
                  })
                }
              >
                Decline
              </button>
            </div>
          )}
          {profile.isOutgoingRequest && profile.requestId && (
            <button
              onClick={() =>
                friendMutation.mutate({
                  type: "CANCEL",
                  id: profile.requestId!,
                })
              }
            >
              Cancel Request
            </button>
          )}
          {profile.isFriend && (
            <button
              onClick={() =>
                friendMutation.mutate({ type: "UNFRIEND", id: profile._id })
              }
            >
              Unfriend
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
