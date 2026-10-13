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
    <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
      {userProfilePic.map((img) => (
        <div key={img.public_id} className="group relative break-inside-avoid rounded-2xl shadow-xl shadow-slate-900/10">
          <div className="overflow-hidden rounded-2xl">
            <Image
            key={img.public_id}
            src={img.url}
            alt="Profile"
            height={500}
            width={500}
            className="h-auto w-full transition duration-300 group-hover:scale-[1.02]"
          />
          </div>
          {userProfileId === myUserId && (
            <div className="absolute right-3 top-3 z-50">
              <ActionDropdown
              itemId={img.public_id}
              openId={openPictureActionId}
              setOpenId={setOpenPictureActionId}
              actions={[
                {
                  label: "Set as Profile",
                  onClick: () =>{
                    setOpenPictureActionId(null);
                    setActiveProfilePicture({ public_id: img.public_id })
                  },
                },
                { label: "Delete", onClick: () => deleteImage(img.public_id) },
              ]}
              className={{
                container:
                  "w-8 h-8 z-50 rounded-full bg-slate-950/65 p-2 text-white opacity-0 transition hover:bg-slate-950 group-hover:opacity-100 cursor-pointer",
              }}
            />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfilePicTab;
