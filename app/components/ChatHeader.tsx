import { useRouter } from "next/navigation";
import React, { use } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

interface ChatHeaderProps {
  user: {
    _id?: string;
    name: string;
  };
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between bg-white p-2 border-b border-color">
      <div className="flex gap-3">
        <button className="cursor-pointer">
          <FaArrowLeft onClick={() => router.back()} />
        </button>
        <h3
          className="cursor-pointer"
          onClick={() => {
            if (user._id) router.push(`/profile/${user._id}`);
          }}
        >
          {user?.name}
        </h3>
      </div>
      {user?._id && (
        <div className="flex gap-2">
          <IoMdInformationCircle />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
