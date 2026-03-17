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
          <button onClick={() => setActiveTab("posts")} className="action-btn btn-primary">Post</button>
          <button onClick={() => setActiveTab("photos")} className="action-btn btn-primary">Photos</button>
        </div>
        <div>
          {activeTab === "posts" && (
            <div  className="flex flex-col gap-5 w-full">
              {profile.isMe && <CreatePost />}
              <ProfilePosts userId={profile._id} />
            </div>
          )}
          {activeTab === "photos" && <ProfilePicTab profilePic={profile.allProfilePictures}/>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostPic;
