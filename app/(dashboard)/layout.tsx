import React from "react";
import TabBar from "../components/TabBar";
import Authguard from "../components/Authguard";
import ProfileDropdown from "../components/ProfileDropdown";
import AIChatIcon from "../components/AIChatIcon";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authguard>
      <div className="min-h-screen bg-transparent text-slate-900">
        <header className="sticky top-0 z-40 border-b border-white/70 bg-white/75 px-4 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div>
              <h1 className="text-xl font-black tracking-normal text-slate-950">Chat Time</h1>
            </div>
            <ProfileDropdown />
          </div>
        </header>
        <TabBar />
        <main className="px-3 pb-24 sm:px-4">{children}</main>
      </div>
      <AIChatIcon />
    </Authguard>
  );
};

export default ChatLayout;
