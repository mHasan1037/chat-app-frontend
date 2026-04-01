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
        className="flex-1 border rounded p-1"
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
