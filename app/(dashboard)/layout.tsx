import React from "react";
import TabBar from "../components/TabBar";
import Authguard from "../components/Authguard";
import ProfileDropdown from "../components/ProfileDropdown";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authguard>
      <div>
        <div className="flex justify-between">
          <h1>Mussanger</h1>
          <ProfileDropdown />
        </div>
        <TabBar />
        {children}
      </div>
    </Authguard>
  );
};

export default ChatLayout;
