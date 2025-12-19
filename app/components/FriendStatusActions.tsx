import React from "react";
import { SingleUserProps } from "../types/friendType";

const FriendStatusActions = ({ user, onFriendAction }: SingleUserProps) => {

  if (user.isFriend) {
    return <button onClick={()=> onFriendAction?.({type: 'UNFRIEND', id: user._id!})}>Unfriend</button>;
  }

  if (user.isIncomingRequest) {
    return (
      <>
        <button onClick={() => onFriendAction?.({ type: "ADD", id: user.requestId! })}>
          Accept
        </button>
        <button onClick={() => onFriendAction?.({ type: "DECLINE", id: user.requestId! })}>
          Declien
        </button>
      </>
    );
  }

  if (user.isOutgoingRequest) {
    return (
      <button onClick={() => onFriendAction?.({ type: "CANCEL", id: user.requestId! })}>
        Cancel request
      </button>
    );
  }
  return (
    <button onClick={() => onFriendAction?.({ type: "ADD", id: user._id })}>
      Add Friend
    </button>
  );
};

export default FriendStatusActions;
