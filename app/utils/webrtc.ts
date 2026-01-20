export const rtcConfig: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export const getAudioStream = () => {
  return navigator.mediaDevices.getUserMedia({ audio: true, video: false });
};

export const getVideoStream = () => {
  return navigator.mediaDevices.getUserMedia({audio: true, video: true});
};
