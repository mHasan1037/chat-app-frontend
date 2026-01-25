import React from "react";
import { EditPostModalProps } from "../types/postType";
import { IoMdClose } from "react-icons/io";

const EditPostModel = ({ isOpen, onClose, children }: EditPostModalProps) => {
  if (!isOpen) return;
  return (
    <div className="fixed top-0 left-0 h-full w-full z-50 center-position bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-lg p-4 relative">
        <div className="flex justify-between mb-3">
          <h1 className="text-lg font-semibold">Edit your post</h1>
          <button className=" cursor-pointer" onClick={onClose}>
          <IoMdClose />
        </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditPostModel;
