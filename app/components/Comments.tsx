import React, { useRef, useState } from "react";
import { useComments } from "../hooks/useComments";
import { useCreateComment } from "../hooks/useCreateComment";
import { HiDotsHorizontal } from "react-icons/hi";
import useClickOutside from "../hooks/useClickOutside";

const Comments = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const { data: allComments, fetchNextPage, hasNextPage } = useComments(postId);
  const { mutate, isPending } = useCreateComment(postId);
  const [openCommentActionId, setOpenCommentActionId] = useState<string | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setOpenCommentActionId(null));

  const submit = () => {
    if (!text.trim()) return;
    mutate(text);
    setText("");
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded p-1"
        />
        <button
          className="action-btn action-btn-blue"
          onClick={submit}
          disabled={isPending}
        >
          Send
        </button>
      </div>

      {allComments?.pages.map((page) =>
        page.comments.map((c: any) => (
          <div
            key={c._id}
            className="text-sm flex items-center justify-between gap-1 group"
          >
            <p className="w-[97%] bg-neutral-100 p-1 rounded-sm">
              <b>{c.author.name}</b>: {c.content}
            </p>
            <div ref={dropdownRef} className="relative shrink-0">
              <HiDotsHorizontal
                onClick={() =>
                  setOpenCommentActionId(
                    openCommentActionId === c._id ? null : c._id,
                  )
                }
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              />

              {openCommentActionId === c._id && (
                <div className="absolute left-0 top-full mt-2 w-20 rounded-md border border-gray-200 bg-white shadow-lg z-20">
                  <button className="cursor-pointer block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="cursor-pointer block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )),
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="text-xs">
          Load more
        </button>
      )}
    </div>
  );
};

export default Comments;
