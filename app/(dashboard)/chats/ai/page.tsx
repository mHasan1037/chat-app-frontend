"use client"
import ChatHeader from '@/app/components/ChatHeader';
import ChatInput from '@/app/components/ChatInput';
import React from 'react'

const AIChat= () => {
    const handleSendMessage = (message: string) => {
        console.log('hello world', message);
    };

  return (
    <div className="flex flex-col h-[80vh] main-content-border">
        <ChatHeader user={{name: 'AI Assistant'}} />
        <ChatInput onSend={handleSendMessage}/>
    </div>
  )
}

export default AIChat;