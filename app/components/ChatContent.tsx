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
      className={`max-w-xs p-2 rounded prose ${
        content.isMe ? "ml-auto blue-background text-white" : "bg-gray-200"
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
