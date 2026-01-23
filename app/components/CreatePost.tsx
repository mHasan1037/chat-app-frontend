"use client";

import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";

type Visibility = "public" | "friends" | "private";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("friends");
  const { mutate, isPending, error } = useCreatePost();

  const handleSubmit = () => {
    if (!content.trim()) return;

    mutate(
      { content, visibility },
      {
        onSuccess: () => {
          setContent("");
          setVisibility("friends");
        },
      },
    );
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts with the world"
        className="w-full resize-none border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          className="border rounded-md px-3 py-1.5 text-sm bg-gray-50"
        >
          <option value={"friends"}>Friends</option>
          <option value={"public"}>Public</option>
          <option value={"private"}>Only Me</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={isPending || !content.trim()}
          className="action-btn action-btn-blue"
        >
          {isPending ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{(error as Error).message}</p>}
    </div>
  );
};

export default CreatePost;
