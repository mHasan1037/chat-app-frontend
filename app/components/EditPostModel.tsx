import React from "react";
import { EditPostModalProps } from "../types/postType";
import { IoMdClose } from "react-icons/io";

const EditPostModel = ({ isOpen, onClose, children }: EditPostModalProps) => {
  if (!isOpen) return;
  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full center-position bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/70 bg-white/90 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-black text-slate-950">Edit your post</h1>
          <button className="center-position h-9 w-9 cursor-pointer rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200" onClick={onClose}>
          <IoMdClose />
        </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditPostModel;
