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

  if (isLoading || friendsLoading) return <p className="py-10 text-center text-sm font-medium text-slate-500">Loading profile...</p>;
  if (isError || !profile) return <p className="py-10 text-center text-sm font-medium text-slate-500">User not found</p>;
  if (isPending) return <p className="py-10 text-center text-sm font-medium text-slate-500">Loading...</p>;

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
      className="main-content-border flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-start"
    >
      <div className="w-full rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-slate-900/5 lg:max-w-xs">
        <div className="flex flex-col items-center text-center">
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
                className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-3xl ring-4 ring-white shadow-2xl shadow-blue-500/15"
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

                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <CiEdit size={30} className="font-bold text-white" />
                </div>
              </div>
            )}
          </CldUploadWidget>
          <h1 className="mt-4 text-2xl font-black text-slate-950">
            {profile.name}
          </h1>
        </div>
        {!profile.isMe && (
          <div className="mt-5 flex justify-center">
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
          <div className="mt-6 border-t border-slate-200/80 pt-5">
            <h1 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">Friends</h1>
            <div className="space-y-2">
              {usersFriends?.map((friend) => (
                <div key={friend._id}>
                  <p
                    className="cursor-pointer truncate rounded-xl px-3 py-2 font-semibold text-slate-700 transition hover:bg-white hover:text-blue-600"
                    onClick={() => handleFriendProfile(friend._id)}
                  >
                    {friend.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <ProfilePostPic userId={userId} />
      </div>
    </div>
  );
};

export default UserProfile;
