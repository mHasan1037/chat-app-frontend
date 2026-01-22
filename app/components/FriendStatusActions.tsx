import React from "react";
import { SingleUserProps } from "../types/friendType";

const FriendStatusActions = ({ user, onFriendAction }: SingleUserProps) => {

  if (user.isFriend) {
    return <button onClick={()=> onFriendAction?.({type: 'UNFRIEND', id: user._id!})} className="action-btn action-btn-red mb-2">Unfriend</button>;
  }

  if (user.isIncomingRequest) {
    return (
      <div className="flex gap-2">
        <button onClick={() => onFriendAction?.({ type: "ADD", id: user.requestId! })} className="action-btn action-btn-blue">
          Accept
        </button>
        <button onClick={() => onFriendAction?.({ type: "DECLINE", id: user.requestId! })} className="action-btn action-btn-red">
          Declien
        </button>
      </div>
    );
  }

  if (user.isOutgoingRequest) {
    return (
      <button onClick={() => onFriendAction?.({ type: "CANCEL", id: user.requestId! })} className="action-btn action-btn-red mb-2">
        Cancel request
      </button>
    );
  }
  return (
    <button onClick={() => onFriendAction?.({ type: "ADD", id: user._id })} className="action-btn action-btn-blue mb-2">
      Add Friend
    </button>
  );
};

export default FriendStatusActions;
