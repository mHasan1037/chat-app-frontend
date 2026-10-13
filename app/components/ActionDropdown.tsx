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
    <div className="relative z-50">
      <HiDotsHorizontal
        onClick={() => setOpenId(isOpen ? null : itemId)}
        className={className.container}
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-10 z-50 mb-2 overflow-hidden rounded-xl border border-white/70 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick();
              }}
              className="block w-full cursor-pointer whitespace-nowrap px-4 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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

