"use client"
import React, { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { logout } from "../utils/logoutFunc";

const ProfileDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, ()=> setShowDropdown(false));

  return (
    <div className="relative inline-block">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold cursor-pointer"
      onClick={()=> setShowDropdown((prev) => !prev)}
      >
        H
      </div>
      {
        showDropdown && (
            <div className="absolute top-full right-0 shadow-md p-2 z-30" ref={dropdownRef}>
              <ul>
                <li className="cursor-pointer">Profile</li>
                <li className="cursor-pointer">Requests</li>
                <li className="cursor-pointer" onClick={logout}>Log out</li>
              </ul>
            </div>
        )
      }
    </div>
  );
};

export default ProfileDropdown;
