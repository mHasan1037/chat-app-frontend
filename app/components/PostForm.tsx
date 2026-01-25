import React from "react";
import {
  PostFormMode,
  PostFormProps,
  SubmitState,
  Visibility,
} from "../types/postType";

const PostForm = ({
  content,
  onContentChange,
  visibility,
  onVisibilityChange,
  mode,
  submitState,
  onSubmit,
  onCancel,
  error,
}: PostFormProps) => {
  const isBusy = submitState === "submitting";

  const submitLabelMap: Record<PostFormMode, Record<SubmitState, string>> = {
    create: {
      idle: "Post",
      submitting: "Posting...",
    },
    edit: {
      idle: "Save",
      submitting: "Saving...",
    },
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={
          mode === "create"
            ? "Share your thoughts with the world"
            : "Edit your post"
        }
        className="w-full resize-none border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <select
          value={visibility}
          onChange={(e) => onVisibilityChange(e.target.value as Visibility)}
          className="border rounded-md px-3 py-1.5 text-sm bg-gray-50"
        >
          <option value={"friends"}>Friends</option>
          <option value={"public"}>Public</option>
          <option value={"private"}>Only Me</option>
        </select>
        <div className="flex gap-2">
          {mode === "edit" && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isBusy}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onSubmit}
            disabled={isBusy || !content.trim()}
            className="action-btn action-btn-blue"
          >
            {submitLabelMap[mode][submitState]}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default PostForm;
