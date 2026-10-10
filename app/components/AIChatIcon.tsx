"use client"

import { useRouter } from "next/navigation";

const AIChatIcon = () => {
  const router = useRouter();

  const aiButtonClick = () =>{
     router.push(`/chats/ai`)
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
    <div
      className="group flex h-14 cursor-pointer items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 p-1 text-white shadow-2xl shadow-blue-500/30"
      onClick={() => aiButtonClick()}
    >
      {/* "CHAT WITH" grows from zero width, so it sits right next to "AI" */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-black opacity-0 transition-all duration-300 ease-in-out group-hover:ml-4 group-hover:-mr-2.5 group-hover:max-w-[100px] group-hover:opacity-100">
        CHAT WITH
      </span>

      {/* AI circle */}
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center text-sm font-black">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/30 transition-opacity duration-300 group-hover:opacity-0" />
        <span className="relative">AI</span>
      </span>
    </div>
  </div>
  );
};

export default AIChatIcon;
