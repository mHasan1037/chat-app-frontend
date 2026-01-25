"use client";

import React, { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost";
import PostForm from "./PostForm";
import { Visibility } from "../types/postType";

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
    <PostForm
      content={content}
      onContentChange={setContent}
      visibility={visibility}
      onVisibilityChange={setVisibility}
      mode="create"
      submitState={isPending ? "submitting" : "idle"}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePost;
