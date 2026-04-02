import React, { useRef } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import useClickOutside from "../hooks/useClickOutside";

export interface ActionItem {
  label: string;
  onClick: () => void;
}

interface ActionDropdownProps {
  itemId: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  actions: ActionItem[];
  className?: {
    container?: string;
  };
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  itemId,
  openId,
  setOpenId,
  actions,
  className = {},
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (openId === itemId) setOpenId(null);
  });

  const isOpen = openId === itemId;
  return (
    <div className="relative">
      <HiDotsHorizontal
        onClick={() => setOpenId(isOpen ? null : itemId)}
        className={className.container}
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 rounded-md border border-gray-200 bg-white shadow-lg z-20"
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick();
              }}
              className="block w-full whitespace-nowrap text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
