export interface IFriendType{
    _id: string;
    name: string;
    email: string
};

export interface IFriendRequest{
    _id: string;
    from: {
        _id: string;
        name: string;
        email: string;
    };
    to: string;
    status: "pending" | "accepted" | "declined";
};

export interface IUserSearchResult{
    _id: string;
    name: string;
    email: string;
    isFriend: boolean;
    isIncomingRequest: boolean;
    isOutgoingRequest: boolean;
    requestId: string | null;
}


export type friendActionTypes = "ADD" | "ACCEPT" | "DECLINE" | "CANCEL";

export interface FriendAction {
    type: friendActionTypes;
    id: string;
}


export interface RandomUsersProps {
    users: IUserSearchResult[];
    onFriendAction?: (action: FriendAction) => void;
    onProfileVisit: (id: string) => void;
  }

export interface SingleUserProps{
    user: IUserSearchResult;
    onFriendAction?: (action: FriendAction) => void;
}