"use client";
import CreatePost from "@/app/components/CreatePost";
import ProfilePosts from "@/app/components/ProfilePosts";
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
    <div key={profile._id} className="max-w-xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">{profile.name}</h1>
        {!profile.isMe && (
          <div>
            {!profile.isFriend &&
              !profile.isIncomingRequest &&
              !profile.isOutgoingRequest && (
                <button
                  onClick={() =>
                    friendMutation.mutate({ type: "ADD", id: profile._id })
                  }
                  className="action-btn action-btn-blue"
                >
                  Add Friend
                </button>
              )}
            {profile.isIncomingRequest && profile.requestId && (
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    friendMutation.mutate({
                      type: "ACCEPT",
                      id: profile.requestId!,
                    })
                  }
                  className="action-btn action-btn-blue"
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
                  className="action-btn action-btn-red"
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
                className="action-btn action-btn-red"
              >
                Cancel Request
              </button>
            )}
            {profile.isFriend && (
              <button
                onClick={() =>
                  friendMutation.mutate({ type: "UNFRIEND", id: profile._id })
                }
                className="action-btn action-btn-red"
              >
                Unfriend
              </button>
            )}
          </div>
        )}
      </div>

      {profile.isMe && <CreatePost />}
      <ProfilePosts userId={profile._id} />
    </div>
  );
};

export default UserProfile;
