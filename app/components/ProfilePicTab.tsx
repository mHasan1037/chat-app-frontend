import React, { useState } from "react";
import Image from "next/image";
import ActionDropdown from "./ActionDropdown";
import { useDeleteProfilePicture } from "../hooks/useDeleteProfilePicture";
import { useSetActiveProfilePicture } from "../hooks/useSetActiveProfilePicture";
import { useAuthUser } from "../hooks/useAuthUser";

interface profilePicType {
  userProfilePic: {
    public_id: string;
    uploadedAt: string;
    url: string;
  }[];
  userProfileId: string;
}

const ProfilePicTab = ({ userProfilePic, userProfileId }: profilePicType) => {
  const [openPictureActionId, setOpenPictureActionId] = useState<string | null>(
    null,
  );
  const myUserId = useAuthUser().data?._id;
  const { mutate: deleteImage, isPending: isPictureDeletePending } =
    useDeleteProfilePicture();
  const { mutate: setActiveProfilePicture, isPending: isPictureSetPending } =
    useSetActiveProfilePicture();

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {userProfilePic.map((img) => (
        <div key={img.public_id} className="relative group break-inside-avoid">
          {userProfileId === myUserId && (
            <ActionDropdown
              itemId={img.public_id}
              openId={openPictureActionId}
              setOpenId={setOpenPictureActionId}
              actions={[
                {
                  label: "Set as Profile",
                  onClick: () =>
                    setActiveProfilePicture({ public_id: img.public_id }),
                },
                { label: "Delete", onClick: () => deleteImage(img.public_id) },
              ]}
              className={{
                container:
                  "absolute text-white top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
              }}
            />
          )}

          <Image
            key={img.public_id}
            src={img.url}
            alt="Profile"
            height={500}
            width={500}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ProfilePicTab;
