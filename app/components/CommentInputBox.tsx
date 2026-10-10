import React from "react";

interface CommentInputProps{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isPending: boolean;
}

const CommentInputBox = ({text, isPending, setText, onSubmit}: CommentInputProps) => {
  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
      />
      <button
        className="action-btn action-btn-blue"
        onClick={onSubmit}
        disabled={isPending}
      >
        Send
      </button>
    </div>
  );
};

export default CommentInputBox;
