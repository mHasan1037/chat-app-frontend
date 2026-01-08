import React from "react";

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
      className={`max-w-xs p-2 rounded ${
        content.isMe ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {content.content}
    </div>
  );
};

export default ChatContent;
