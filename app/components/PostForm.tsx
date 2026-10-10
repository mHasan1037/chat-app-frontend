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
    <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={
          mode === "create"
            ? "Share your thoughts with the world"
            : "Edit your post"
        }
        className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
        rows={3}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <select
          value={visibility}
          onChange={(e) => onVisibilityChange(e.target.value as Visibility)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
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
              className="rounded-full px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100"
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
      {error && <p className="mt-3 text-sm font-medium text-rose-500">{error.message}</p>}
    </div>
  );
};

export default PostForm;
