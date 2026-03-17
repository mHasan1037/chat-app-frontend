import React from "react";
import Image from "next/image";

interface profilePicType {
  profilePic: {
    public_id: string;
    uploadedAt: string;
    url: string;
  }[];
}

const ProfilePicTab = ({ profilePic }: profilePicType) => {
  return (
    <div className="flex flex-wrap gap-3">
      {profilePic.map((img) => (
        <Image
          key={img.public_id}
          src={img.url}
          alt="Profile"
          height={200}
          width={200}
        />
      ))}
    </div>
  );
};

export default ProfilePicTab;
