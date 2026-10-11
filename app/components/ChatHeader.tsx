import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

interface ChatHeaderProps {
  user: {
    _id?: string;
    name: string;
    profilePicture?: string;
  };
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-b border-white/70 bg-white/80 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button className="center-position h-9 w-9 cursor-pointer rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600">
          <FaArrowLeft onClick={() => router.back()} />
        </button>
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => {
            if (user._id) router.push(`/profile/${user._id}`);
          }}
        >
          <div className="center-position h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-black text-white">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase()
            )}
          </div>
          <h3 className="truncate font-bold text-slate-950">{user?.name}</h3>
        </div>
      </div>
      {user?._id && (
        <div className="center-position h-9 w-9 rounded-full bg-slate-100 text-slate-500">
          <IoMdInformationCircle size={20} />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
