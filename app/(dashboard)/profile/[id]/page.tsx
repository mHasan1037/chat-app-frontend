"use client";
import { useFriendMutations } from "@/app/hooks/useFriendMutation";
import { useFriends } from "@/app/hooks/useFriends";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useParams, useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { useUpdateProfilePicture } from "@/app/hooks/useUpdateProfilePicture";
import ProfilePostPic from "@/app/components/ProfilePostPic";

const UserProfile = () => {
  const { id } = useParams<{ id: string | string[] }>();
  const userId = Array.isArray(id) ? id[0] : id;
  const { data: profile, isLoading, isError } = useUserProfile(userId);
  const { data: usersFriends = [], isLoading: friendsLoading } = useFriends(
    profile?._id,
  );
  const { mutate: uploadProfilePicture, isPending } = useUpdateProfilePicture();
  const friendMutation = useFriendMutations();
  const router = useRouter();

  if (isLoading || friendsLoading) return <p>Loading profile...</p>;
  if (isError || !profile) return <p>User not found</p>;
  if (isPending) return <p>Loading...</p>;

  const handleFriendProfile = async (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleUpload = (result: any) => {
    const image = {
      url: result.info.secure_url,
      public_id: result.info.public_id,
    };

    uploadProfilePicture(image);
  };

  return (
    <div
      key={profile._id}
      className="space-y-4 max-w-2xl mx-auto my-8 bg-white shadow-lg rounded-xl p-6 flex items-start gap-10"
    >
      <div>
        <div className="flex flex-col items-center">
          <CldUploadWidget
            uploadPreset={
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
            }
            options={{
              maxFiles: 1,
              cropping: true,
              croppingAspectRatio: 1,
            }}
            onSuccess={handleUpload}
          >
            {({ open }) => (
              <div
                onClick={() => open()}
                className="relative w-[60px] h-[60px] group cursor-pointer rounded-full overflow-hidden"
              >
                <Image
                  key={profile.profilePicture}
                  src={
                    profile.profilePicture
                      ? profile.profilePicture
                      : "/profile_pic.png"
                  }
                  alt="Profile"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <CiEdit size={26} className="text-white font-bold" />
                </div>
              </div>
            )}
          </CldUploadWidget>
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
                  className="whitespace-nowrap cursor-pointer hover:text-blue-600"
                  onClick={() => handleFriendProfile(friend._id)}
                >
                  {friend.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProfilePostPic userId={userId} />
    </div>
  );
};

export default UserProfile;
