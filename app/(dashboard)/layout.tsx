import React from "react";
import TabBar from "../components/TabBar";
import Authguard from "../components/Authguard";
import ProfileDropdown from "../components/ProfileDropdown";
import AIChatIcon from "../components/AIChatIcon";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authguard>
      <div className="min-h-screen bg-gray-50">
        <header className="flex justify-between px-6 py-4 bg-white shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Chat Time</h1>
          <ProfileDropdown />
        </header>
        <TabBar />
        <main>{children}</main>
      </div>
      <AIChatIcon />
    </Authguard>
  );
};

export default ChatLayout;
