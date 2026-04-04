import React, { useState } from "react";
import Image from "next/image";
import ActionDropdown from "./ActionDropdown";
import { useDeleteProfilePicture } from "../hooks/useDeleteProfilePicture";
import { useSetActiveProfilePicture } from "../hooks/useSetActiveProfilePicture";

interface profilePicType {
  profilePic: {
    public_id: string;
    uploadedAt: string;
    url: string;
  }[];
}

const ProfilePicTab = ({ profilePic }: profilePicType) => {
  const [openPictureActionId, setOpenPictureActionId] = useState<string | null>(null);
  const { mutate: deleteImage, isPending: isPictureDeletePending } = useDeleteProfilePicture();
  const {mutate: setActiveProfilePicture, isPending: isPictureSetPending} = useSetActiveProfilePicture();

  return (
    <div className="flex flex-wrap gap-3">
      {profilePic.map((img) => (
        <div key={img.public_id} className="relative group">
          <ActionDropdown
            itemId={img.public_id}
            openId={openPictureActionId}
            setOpenId={setOpenPictureActionId}
            actions={[
              { label: "Set as Profile", onClick: () => setActiveProfilePicture({public_id: img.public_id}) },
              { label: "Delete", onClick: () => deleteImage(img.public_id) },
            ]}
            className={{
              container: "absolute text-white top-1 right-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
            }}
          />
          <Image
            key={img.public_id}
            src={img.url}
            alt="Profile"
            height={200}
            width={200}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfilePicTab;
