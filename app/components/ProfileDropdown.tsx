"use client";
import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { logout } from "../utils/logoutFunc";
import { useRouter } from "next/navigation";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useAuthUser } from "../hooks/useAuthUser";

const ProfileDropdown = () => {
  const {data: requests = [], isLoading} = useFriendRequests();
  const {data: user} = useAuthUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const UserFirstLetter = user?.name?.charAt(0).toUpperCase() ?? "U";

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  const handlePageChange = (page: string) => {
    router.push(page);
    setShowDropdown(false);
  };

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full bg-blue-600 text-white center-position cursor-pointer relative"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {requests.length !== 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full bg-red-500 center-position">
            {requests.length}
          </span>
        )}
        <h1 className="font-semibold">{UserFirstLetter}</h1>
      </div>
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-30"
          ref={dropdownRef}
        >
          <ul className="whitespace-nowrap py-1 text-sm text-gray-700">
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={()=> handlePageChange('/profile/me')}>Profile</li>
            <li
              className="cursor-pointer flex gap-1 py-2 px-4 hover:bg-gray-100"
              onClick={() => handlePageChange("/requests")}
            >
              <span>Requests</span> {requests.length !== 0 && <span className="w-5 h-5 text-xs rounded-full bg-red-500 text-white center-position">{requests.length}</span>}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={logout}>
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
