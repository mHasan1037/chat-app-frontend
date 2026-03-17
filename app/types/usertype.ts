export interface IUserProfile {
  _id: string;
  email: string;
  phone?: string;
  friends: string[];
  isFriend: boolean;
  isIncomingRequest: boolean;
  isMe: boolean;
  isOutgoingRequest: boolean;
  name: string;
  requestId: string | null;
  profilePicture?: string;
  allProfilePictures: {
    url: string;
    public_id: string;
    uploadedAt: string; 
  }[];
}
