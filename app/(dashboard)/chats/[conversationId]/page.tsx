"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuthUser } from "@/app/hooks/useAuthUser";
import {
  getConversationById,
  getMessagesByConversationId,
  sendMessage,
} from "@/app/services/chatService";
import { getSocket } from "@/app/utils/socket";
import { useParams } from "next/navigation";
import ChatHeader from "@/app/components/ChatHeader";
import ChatContent from "@/app/components/ChatContent";
import ChatInput from "@/app/components/ChatInput";
import { startAudioCallFunc } from "@/app/utils/startAudioCallFn";
import { getAudioStream, getVideoStream, rtcConfig } from "@/app/utils/webrtc";
import IncomingCallPopup from "@/app/components/IncomingCallPopup";

const chatPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const myUserId = useAuthUser().data?._id;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isInCall, setInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const messagesWithIsMe = messages.map((msg) => ({
    ...msg,
    isMe: msg.sender._id === myUserId,
  }));

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const atBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (!myUserId) return;
    const socket = getSocket();
    socket.emit("joinUser", myUserId);
  }, [myUserId]);

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();

    socket.emit("joinConversation", conversationId);

    getMessagesByConversationId(conversationId).then(setMessages);
    getConversationById(conversationId).then(setConversation);

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.off("newMessage", handleNewMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  const endCall = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());

    pcRef.current?.getSenders().forEach((sender) => {
      pcRef.current?.removeTrack(sender);
    });
    pcRef.current?.close();

    localStreamRef.current = null;
    remoteStreamRef.current = null;
    pcRef.current = null;

    setInCall(false);
  };

  useEffect(() => {
    if (!conversationId || !myUserId) return;

    const socket = getSocket();

    const onOffer = async ({
      fromUserId,
      conversationId: cId,
      offer,
      type,
    }: any) => {
      if (cId !== conversationId) return;

      setIncomingCall({
        fromUserId,
        offer,
        type,
      });
    };

    const onAnswer = async ({ conversationId: cId, answer }: any) => {
      if (cId !== conversationId) return;
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(answer);
    };

    const onIce = async ({ conversationId: cId, candidate }: any) => {
      if (cId !== conversationId) return;
      const pc = pcRef.current;
      if (!pc) return;
      try {
        await pc.addIceCandidate(candidate);
      } catch {}
    };

    const onCallEnd = ({ conversationId: cId }: any) => {
      if (cId !== conversationId) return;
      setIncomingCall(null);
      setInCall(false);

      if (pcRef.current) {
        localStreamRef.current?.getTracks().forEach((t) => t.stop());
        pcRef.current
          .getSenders()
          .forEach((s) => pcRef.current?.removeTrack(s));
        pcRef.current.close();
      }

      pcRef.current = null;
      localStreamRef.current = null;
      remoteStreamRef.current = null;
    };

    socket.on("call:offer", onOffer);
    socket.on("call:answer", onAnswer);
    socket.on("call:ice", onIce);
    socket.on("call:end", onCallEnd);

    return () => {
      socket.off("call:offer", onOffer);
      socket.off("call:answer", onAnswer);
      socket.off("call:ice", onIce);
      socket.off("call:end", onCallEnd);
    };
  }, [conversationId, myUserId]);

  useEffect(() => {
    if (remoteAudioRef.current && remoteStreamRef.current) {
      remoteAudioRef.current.srcObject = remoteStreamRef.current as any;
    }
    if (remoteVideoRef.current && remoteStreamRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }, [isInCall]);

  const handleSendMessage = async (message: string) => {
    if (!conversationId) return;
    await sendMessage(conversationId, message);
  };

  const otherUser = conversation?.members?.find((m: any) => m._id !== myUserId);

  const startAudioCall = () => {
    if (!otherUser?._id) return;
    if (!myUserId || !conversationId) return;
    if (isInCall) return;
    console.log("startAudioCall is fired");
    startCall("audio");
  };

  const startVideoCall = () => {
    if (!otherUser?._id) return;
    if (!myUserId || !conversationId) return;
    if (isInCall) return;
    startCall("video");
  };

  const startCall = async (type: "audio" | "video") => {
    console.log("startCall function got the type:", type);
    startAudioCallFunc({
      otherUser,
      myUserId,
      conversationId,
      pcRef,
      remoteStreamRef,
      localStreamRef,
      setInCall,
      type,
      localVideoRef,
    });
  };

  const acceptCall = async () => {
    const { fromUserId, offer } = incomingCall;
    const socket = getSocket();

    const pc = new RTCPeerConnection(rtcConfig);
    pcRef.current = pc;
    remoteStreamRef.current = new MediaStream();

    const localStream =
      incomingCall.type === "video"
        ? await getVideoStream()
        : await getAudioStream();
    localStreamRef.current = localStream;

    if (incomingCall.type === "video" && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("call:ice", {
          toUserId: fromUserId,
          fromUserId: myUserId,
          conversationId,
          candidate: e.candidate,
        });
      }
    };

    pc.ontrack = (e) => {
      e.streams[0]
        .getTracks()
        .forEach((t) => remoteStreamRef.current?.addTrack(t));

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current!;
      }
    };

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("call:answer", {
      toUserId: fromUserId,
      fromUserId: myUserId,
      conversationId,
      answer,
    });

    setIncomingCall(null);
    setInCall(true);
  };

  const rejectCall = () => {
    const socket = getSocket();
    socket.emit("call:end", {
      toUserId: incomingCall.fromUserId,
      fromUserId: myUserId,
      conversationId,
    });
    setIncomingCall(null);
  };

  const endCallForBoth = () => {
    if (!isInCall) return;

    const socket = getSocket();

    socket.emit("call:end", {
      toUserId: otherUser?._id,
      fromUserId: myUserId,
      conversationId,
    });

    endCall();
  };

  if(!conversation){
    return <div>Loading conversation</div>
  }

  return (
    <div className="flex flex-col h-[80vh] relative">
      {isInCall &&
        (localStreamRef.current?.getVideoTracks()?.length ?? 0) > 0 && (
          <>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-40 h-40"
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full"
            />
          </>
        )}
      {incomingCall && (
        <IncomingCallPopup onAccept={acceptCall} onReject={rejectCall} />
      )}
      <audio ref={remoteAudioRef} autoPlay />
      {isInCall && (
        <button
          onClick={endCallForBoth}
          className="flex justify-end bg-white p-2"
        >
          End
        </button>
      )}
      {!isInCall && otherUser && (
        <ChatHeader
          user={otherUser}
          onAudioCall={startAudioCall}
          onVideoCall={startVideoCall}
        />
      )}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messagesWithIsMe.map((msg) => (
          <ChatContent content={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSendMessage} />:
    </div>
  );
};

export default chatPage;
