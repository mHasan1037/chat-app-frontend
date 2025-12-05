import React from "react";
import TabBar from "../components/TabBar";
import Authguard from "../components/Authguard";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authguard>
      <div>
        <h1>Mussanger</h1>
        <TabBar />
        {children}
      </div>
    </Authguard>
  );
};

export default ChatLayout;
