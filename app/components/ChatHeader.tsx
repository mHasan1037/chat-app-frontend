import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { IoIosCall, IoMdInformationCircle } from "react-icons/io";

interface ChatHeaderProps {
  user: {
    _id: string;
    name: string;
  };
  onAudioCall: () => void;
  onVideoCall: () => void;
}

const ChatHeader = ({ user, onAudioCall, onVideoCall }: ChatHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between bg-white p-2">
      <div className="flex gap-3">
        <button className="cursor-pointer">
          <FaArrowLeft onClick={() => router.back()} />
        </button>
        <h3
          className="cursor-pointer"
          onClick={() => router.push(`/profile/${user._id}`)}
        >
          {user?.name}
        </h3>
      </div>
      <div className="flex gap-2">
        <button onClick={onAudioCall} className="cursor-pointer">
          <IoIosCall />
        </button>
        <button onClick={onVideoCall} className="cursor-pointer">
          <FaVideo />
        </button>
        <IoMdInformationCircle />
      </div>
    </div>
  );
};

export default ChatHeader;
