import React from "react";

interface PostItemProps {
  post: any;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{post.author?.name}</span>
        <span className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-gray-800 text-sm whitespace-pre-wrap">
        {post.content}
      </p>
    </div>
  );
};

export default PostItem;
