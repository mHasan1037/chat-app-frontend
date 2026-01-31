import React, { useState } from "react";
import { useDeletePost } from "../hooks/useDeletePost";
import EditPostModel from "./EditPostModel";
import PostForm from "./PostForm";
import { Visibility } from "../types/postType";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { useToggleLike } from "../hooks/useToggleLike";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Comments from "./Comments";

interface PostItemProps {
  post: any;
  currentUserId: string;
}

const PostItem = ({ post, currentUserId }: PostItemProps) => {
  const isOwner =
    post?.author?._id === currentUserId || post?.author === currentUserId;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [content, setContent] = useState(post.content);
  const [visibility, setVisibility] = useState<Visibility>(post.visibility);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdatePost();
  const { mutate: deleteMutate, isPending } = useDeletePost();
  const { mutate: toggleLikeMutate, isPending: isLiking } = useToggleLike();

  const handleUpdate = () => {
    if (!content.trim()) return;

    updateMutate(
      { postId: post._id, content, visibility },
      {
        onSuccess: () => {
          setIsEditOpen(false);
        },
      },
    );
  };

  const handleDelete = () => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    deleteMutate(post?._id);
  };

  return (
    <>
      <div className="bg-white border rounded-lg p-4 space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">{post.author?.name}</div>
          {isOwner && (
            <div className="flex gap-2">
              <button
                className="action-btn action-btn-blue"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </button>
              <button
                className="action-btn action-btn-red disabled:opacity-50"
                disabled={isPending}
                onClick={handleDelete}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
        <p className="text-gray-800 text-sm whitespace-pre-wrap">
          {post.content}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-0.5">
              <AiFillLike
                onClick={() => !isLiking && toggleLikeMutate(post._id)}
                className={`cursor-pointer transition-colors ${isLiking ? "text-gray-300" : post.likedByMe ? "text-blue-600" : "text-gray-600"}`}
              />{" "}
              {post.likeCount}
            </div>
            {post.commentCount > 0 && (
              <div className="flex items-center gap-0.5 ">
                <FaComment className="text-gray-600"/>
                {post.commentCount}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 flex gap-2">
            {post.isEdited && (
              <span className="text-xs text-gray-500">Edited</span>
            )}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <Comments postId={post._id} />
      </div>
      <EditPostModel
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setContent(post.content);
          setVisibility(post.visibility);
        }}
      >
        <PostForm
          content={content}
          onContentChange={setContent}
          visibility={visibility}
          onVisibilityChange={setVisibility}
          mode="edit"
          submitState={isUpdating ? "submitting" : "idle"}
          onSubmit={handleUpdate}
          onCancel={() => {
            setIsEditOpen(false);
            setContent(post.content);
            setVisibility(post.visibility);
          }}
        />
      </EditPostModel>
    </>
  );
};

export default PostItem;
