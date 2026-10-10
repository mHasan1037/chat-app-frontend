"use client";
import React, { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { logout } from "../utils/logoutFunc";
import { useRouter } from "next/navigation";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useAuthUser } from "../hooks/useAuthUser";
import Image from "next/image";

const ProfileDropdown = () => {
  const { data: requests = [], isLoading } = useFriendRequests();
  const { data: user } = useAuthUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const UserFirstLetter = user?.name?.charAt(0).toUpperCase() ?? "U";

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  const handlePageChange = (page: string) => {
    router.push(page);
    setShowDropdown(false);
  };

  if (isLoading) {
    return <h1 className="text-sm font-semibold text-slate-500">Loading...</h1>;
  }

  return (
    <div className="relative">
      <div
        className="relative h-11 w-11 cursor-pointer rounded-full p-0.5 ring-2 ring-white/80 transition hover:ring-blue-200"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {requests.length !== 0 && (
          <span className="absolute -right-1 -top-1 z-10 h-5 w-5 rounded-full bg-rose-500 text-xs font-bold text-white center-position shadow-md">
            {requests.length}
          </span>
        )}
        <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white center-position shadow-lg shadow-blue-500/20">
          {user?.profilePicture ? (
          <Image
            src={user?.profilePicture}
            alt={UserFirstLetter}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <h1 className="font-black">{UserFirstLetter}</h1>
        )}
        </div>
      </div>
      {showDropdown && (
        <div
          className="absolute right-0 z-30 mt-3 w-48 overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl"
          ref={dropdownRef}
        >
          <ul className="whitespace-nowrap py-2 text-sm font-semibold text-slate-700">
            <li
              className="cursor-pointer px-4 py-2.5 transition hover:bg-slate-100"
              onClick={() => handlePageChange("/profile/me")}
            >
              Profile
            </li>
            <li
              className="flex cursor-pointer items-center gap-2 px-4 py-2.5 transition hover:bg-slate-100"
              onClick={() => handlePageChange("/requests")}
            >
              <span>Requests</span>{" "}
              {requests.length !== 0 && (
                <span className="h-5 w-5 rounded-full bg-rose-500 text-xs text-white center-position">
                  {requests.length}
                </span>
              )}
            </li>
            <li
              className="cursor-pointer px-4 py-2.5 text-rose-600 transition hover:bg-rose-50"
              onClick={logout}
            >
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

