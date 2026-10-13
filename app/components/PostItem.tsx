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
import { useRouter } from "next/navigation";

interface PostItemProps {
  post: any;
  canEdit?: boolean;
}

const PostItem = ({ post, canEdit = false }: PostItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [content, setContent] = useState(post.content);
  const [visibility, setVisibility] = useState<Visibility>(post.visibility);
  const [showComment, setShowComment] = useState(false);
  const router = useRouter();

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
      <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-slate-900/5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="center-position h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-black text-white">
              {post.author?.profilePicture ? (
                <img
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                post.author?.name?.charAt(0)?.toUpperCase()
              )}
            </div>
            <div
              className="cursor-pointer truncate font-bold text-slate-950 hover:text-blue-600"
              onClick={() => router.push(`/profile/${post.author?._id}`)}
            >
              {post.author?.name}
            </div>
          </div>
          {canEdit && (
            <div className="flex shrink-0 gap-2">
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
        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {post.content}
        </p>
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
            <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5">
              <AiFillLike
                onClick={() => !isLiking && toggleLikeMutate(post._id)}
                className={`cursor-pointer text-lg transition-colors ${isLiking ? "text-slate-300" : post.likedByMe ? "text-blue-600" : "text-slate-500"}`}
              />{" "}
              {post.likeCount}
            </div>
            <div
              className="flex cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 transition hover:text-blue-600"
              onClick={() => setShowComment(!showComment)}
            >
              <FaComment className="text-slate-500" />
              {post.commentCount}
            </div>
          </div>
          <p className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
            <span className="capitalize">{post.visibility}</span>
            {post.isEdited && <span>Edited</span>}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {showComment && <Comments postId={post._id} />}
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
