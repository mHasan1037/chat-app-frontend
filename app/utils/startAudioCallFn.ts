import { getSocket } from "./socket";
import { getAudioStream, getVideoStream, rtcConfig } from "./webrtc";

interface StartAudioCallParams {
  otherUser: any;
  myUserId: string;
  conversationId: string;
  pcRef: React.MutableRefObject<RTCPeerConnection | null>;
  localStreamRef: React.MutableRefObject<MediaStream | null>;
  remoteStreamRef: React.MutableRefObject<MediaStream | null>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  localVideoRef?: React.MutableRefObject<HTMLVideoElement | null>;
}

export const startAudioCallFunc = async ({
  otherUser,
  myUserId,
  conversationId,
  pcRef,
  remoteStreamRef,
  localStreamRef,
  setInCall,
  type,
  localVideoRef,
}: StartAudioCallParams) => {
    console.log(
    "startAudioCallFunc fired with",
    otherUser,
    myUserId,
    conversationId,
    pcRef,
    remoteStreamRef,
    localStreamRef,
    setInCall,
    type,
    localVideoRef,
  );
  
  if (!otherUser?._id || !myUserId || !conversationId) return;

  const socket = getSocket();

  const pc = new RTCPeerConnection(rtcConfig);
  pcRef.current = pc;

  remoteStreamRef.current = new MediaStream();

  const localStream =
    type === "video" ? await getVideoStream() : await getAudioStream();
  localStreamRef.current = localStream;

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (type === "video" && localVideoRef?.current) {
    localVideoRef.current.srcObject = localStream;
  }

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("call:ice", {
        toUserId: otherUser._id,
        fromUserId: myUserId,
        conversationId,
        candidate: event.candidate,
      });
    }
  };

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((t) => {
      remoteStreamRef.current?.addTrack(t);
    });
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  socket.emit("call:offer", {
    toUserId: otherUser._id,
    fromUserId: myUserId,
    conversationId,
    offer,
    type,
  });

  setInCall(true);
};
