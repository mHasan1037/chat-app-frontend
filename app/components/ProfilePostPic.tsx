import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import CreatePost from "./CreatePost";
import ProfilePosts from "./ProfilePosts";
import ProfilePicTab from "./ProfilePicTab";

const ProfilePostPic = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<"posts" | "photos">("posts");
  const { data: profile, isLoading, isError } = useUserProfile(userId);

  if (isError || !profile) return <p>User not found</p>;
  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div>
      <div>
        <div className="flex gap-3 mb-3">
          <button
            onClick={() => setActiveTab("posts")}
            className={`${activeTab === "posts" && "action-btn btn-primary"} cursor-pointer `}
          >
            Post
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`${activeTab === "photos" && "action-btn btn-primary"} cursor-pointer `}
          >
            Photos
          </button>
        </div>
        <div>
          {activeTab === "posts" && (
            <div className="flex flex-col gap-5 w-full">
              {profile.isMe && <CreatePost />}
              <ProfilePosts userId={profile._id} />
            </div>
          )}
          {activeTab === "photos" &&
            (profile.allProfilePictures &&
            profile.allProfilePictures.length > 0 ? (
              <ProfilePicTab profilePic={profile.allProfilePictures} />
            ) : (
              <p className="text-gray-500">No photos</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostPic;
