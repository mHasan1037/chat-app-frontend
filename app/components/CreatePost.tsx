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
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts with the world"
        className="border rounded-md p-2 focus:outline-none focus:ring"
        rows={3}
      />
      <div className="flex gap-3">
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
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
      {error && <p>{(error as Error).message}</p>}
    </div>
  );
};

export default CreatePost;
