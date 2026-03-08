"use client";
import CreatePost from "@/app/components/CreatePost";
import ProfilePosts from "@/app/components/ProfilePosts";
import { useFriendMutations } from "@/app/hooks/useFriendMutation";
import { useFriends } from "@/app/hooks/useFriends";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const UserProfile = () => {
  const { id } = useParams<{ id: string | string[] }>();
  const userId = Array.isArray(id) ? id[0] : id;
  const { data: profile, isLoading, isError } = useUserProfile(userId);
  const { data: usersFriends = [], isLoading: friendsLoading } = useFriends(
    profile?._id,
  );
  const friendMutation = useFriendMutations();
  const router = useRouter();

  if (isLoading || friendsLoading) return <p>Loading profile...</p>;
  if (isError || !profile) return <p>User not found</p>;

  const handleFriendProfile = async (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
    <div
      key={profile._id}
      className="space-y-4 max-w-2xl mx-auto my-8 bg-white shadow-lg rounded-xl p-6 flex items-start gap-10"
    >
      <div>
        <div className="flex flex-col items-center">
          <Image
            src="/profile_pic.png"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold whitespace-nowrap">
            {profile.name}
          </h1>
        </div>
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
                className="action-btn action-btn-red whitespace-nowrap"
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
        {usersFriends?.length !== 0 && (
          <div className="my-5">
            <h1 className="text-lg font-bold">Friends</h1>
            {usersFriends?.map((friend) => (
              <div key={friend._id}>
                <p
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => handleFriendProfile(friend._id)}
                >
                  {friend.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 w-full">
        {profile.isMe && <CreatePost />}
        <ProfilePosts userId={profile._id} />
      </div>
    </div>
  );
};

export default UserProfile;
