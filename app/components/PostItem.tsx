import React from "react";
import { useDeletePost } from "../hooks/useDeletePost";

interface PostItemProps {
  post: any;
  currentUserId: string;
}

const PostItem = ({ post, currentUserId }: PostItemProps) => {
  const { mutate: deleteMutate, isPending } = useDeletePost();
  const isOwner =
    post?.author?._id === currentUserId || post?.author === currentUserId;

  const handleDelete = () => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    deleteMutate(post?._id);
  };
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">{post.author?.name}</div>
        {isOwner && (
          <button
            className="action-btn action-btn-red disabled:opacity-50"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
      <p className="text-gray-800 text-sm whitespace-pre-wrap">
        {post.content}
      </p>
      <span className="text-xs text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default PostItem;
