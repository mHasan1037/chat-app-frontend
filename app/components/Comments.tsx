import React, { useRef, useState } from "react";
import { useComments } from "../hooks/useComments";
import { useCreateComment } from "../hooks/useCreateComment";
import useClickOutside from "../hooks/useClickOutside";
import { useDeleteComment } from "../hooks/useDeleteComment";
import CommentInputBox from "./CommentInputBox";
import { useEditComment } from "../hooks/useEditComment";
import ActionDropdown from "./ActionDropdown";
import { useAuthUser } from "../hooks/useAuthUser";

interface CommentsProps {
  postId: string;
}

const Comments = ({ postId }: CommentsProps) => {
  const myUserId = useAuthUser().data?._id;
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { data: allComments, fetchNextPage, hasNextPage } = useComments(postId);
  const { mutate, isPending } = useCreateComment(postId);
  const { mutate: deleteComment } = useDeleteComment(postId);
  const { mutate: editComment } = useEditComment(postId);
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

  const handleCommentEdit = (id: string, content: string) => {
    setEditingCommentId(id);
    setEditText(content);
    setOpenCommentActionId(null);
  };

  const handleEditSubmit = () => {
    if (!editText.trim() || !editingCommentId) return;

    editComment({
      commentId: editingCommentId,
      content: editText,
    });

    setEditingCommentId(null);
    setEditText("");
  };

  return (
    <div className="mt-4 space-y-3 rounded-2xl bg-slate-50/80 p-3">
      <CommentInputBox
        text={text}
        isPending={isPending}
        setText={setText}
        onSubmit={submit}
      />
      {allComments?.pages.map((page) =>
        page.comments.map((c: any) => {
          const isEditing = editingCommentId === c._id;

          return (
            <div
              key={c._id}
              className="group flex items-center justify-between gap-2 text-sm"
            >
              {isEditing ? (
                <div className="w-full">
                  <CommentInputBox
                    text={editText}
                    isPending={false}
                    setText={setEditText}
                    onSubmit={handleEditSubmit}
                  />
                </div>
              ) : (
                <>
                  <p className="w-[97%] rounded-2xl bg-white px-3 py-2 leading-6 text-slate-700 shadow-sm">
                    <b className="text-slate-950">{c.author.name}</b>: {c.content}
                  </p>
                  {myUserId === c.author._id && (
                    <ActionDropdown
                      itemId={c._id}
                      openId={openCommentActionId}
                      setOpenId={setOpenCommentActionId}
                      actions={[
                        {
                          label: "Edit",
                          onClick: () => {
                            handleCommentEdit(c._id, c.content);
                            setOpenCommentActionId(null);
                          },
                        },
                        {
                          label: "Delete",
                          onClick: () => {
                            deleteComment(c._id);
                            setOpenCommentActionId(null);
                          },
                        },
                      ]}
                      className={{
                        container:
                          "rounded-full p-1 text-slate-400 opacity-0 transition hover:bg-white hover:text-slate-700 group-hover:opacity-100 cursor-pointer",
                      }}
                    />
                  )}
                </>
              )}
            </div>
          );
        }),
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="text-xs font-bold text-blue-600">
          Load more
        </button>
      )}
    </div>
  );
};

export default Comments;
