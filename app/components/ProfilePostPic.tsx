import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import CreatePost from "./CreatePost";
import ProfilePosts from "./ProfilePosts";
import ProfilePicTab from "./ProfilePicTab";

const ProfilePostPic = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<"posts" | "photos">("posts");
  const { data: profile, isLoading, isError } = useUserProfile(userId);

  if (isError || !profile) return <p className="text-sm font-medium text-slate-500">User not found</p>;
  if (isLoading) return <p className="text-sm font-medium text-slate-500">Loading profile...</p>;

  return (
    <div className="space-y-4">
      <div className="flex w-fit gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-lg shadow-slate-900/5">
        <button
          onClick={() => setActiveTab("posts")}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "posts" ? "bg-slate-950 text-white shadow-md shadow-slate-900/20" : "text-slate-600 hover:bg-white hover:text-blue-600"}`}
        >
          Post
        </button>
        <button
          onClick={() => setActiveTab("photos")}
          className={`cursor-pointer rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === "photos" ? "bg-slate-950 text-white shadow-md shadow-slate-900/20" : "text-slate-600 hover:bg-white hover:text-blue-600"}`}
        >
          Photos
        </button>
      </div>
      <div>
        {activeTab === "posts" && (
          <div className="flex w-full flex-col gap-5">
            {profile.isMe && <CreatePost />}
            <ProfilePosts userId={profile._id} />
          </div>
        )}
        {activeTab === "photos" &&
          (profile.allProfilePictures &&
          profile.allProfilePictures.length > 0 ? (
            <ProfilePicTab userProfilePic={profile.allProfilePictures} userProfileId={profile._id} />
          ) : (
            <p className="rounded-2xl bg-white/70 p-6 text-center text-sm font-medium text-slate-500">No photos</p>
          ))}
      </div>
    </div>
  );
};

export default ProfilePostPic;
