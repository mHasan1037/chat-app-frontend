import React, { useState } from "react";
import { useComments } from "../hooks/useComments";
import { useCreateComment } from "../hooks/useCreateComment";

const Comments = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const { data: allComments, fetchNextPage, hasNextPage } = useComments(postId);
  const { mutate, isPending } = useCreateComment(postId);

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
        <button onClick={submit} disabled={isPending}>
          Send
        </button>
      </div>

      {allComments?.pages.map((page) =>
        page.comments.map((c: any) => (
          <div key={c._id} className="text-sm">
            <b>{c.author.name}</b>: {c.content}
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
