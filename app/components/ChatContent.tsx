import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface ContentProps {
  content: {
    _id: string;
    isMe: boolean;
    content: string;
  };
}

const ChatContent = ({ content }: ContentProps) => {
  return (
    <div
      key={content._id}
      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm prose prose-sm ${
        content.isMe
          ? "ml-auto rounded-br-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white prose-invert shadow-blue-500/20"
          : "mr-auto rounded-bl-md border border-white/80 bg-white/90 text-slate-800 shadow-slate-900/5"
      }`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <span>{children}</span>,
        }}
        rehypePlugins={[rehypeHighlight]}
      >
        {content.content}
      </ReactMarkdown>
    </div>
  );
};

export default ChatContent;
