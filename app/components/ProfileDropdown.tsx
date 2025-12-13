"use client";
import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { logout } from "../utils/logoutFunc";
import { useRouter } from "next/navigation";
import { useFriendRequestStore } from "../store/friendRequestStore";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { requests, fetchRequests } = useFriendRequestStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  const handlePageChange = (page: string) => {
    router.push(page);
    setShowDropdown(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="relative inline-block">
      <div
        className="w-10 h-10 rounded-full bg-gray-300 center-position cursor-pointer relative"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {requests.length !== 0 && (
          <div className="absolute top-0 left-[-5px] w-5 h-5 rounded-full bg-blue-500 center-position">
            {requests.length}
          </div>
        )}
        <h1 className="font-bold">H</h1>
      </div>
      {showDropdown && (
        <div
          className="absolute top-full right-0 shadow-md p-2 z-30"
          ref={dropdownRef}
        >
          <ul>
            <li className="cursor-pointer">Profile</li>
            <li
              className="cursor-pointer"
              onClick={() => handlePageChange("requests")}
            >
              Requests
            </li>
            <li className="cursor-pointer" onClick={logout}>
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
