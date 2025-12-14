import { IUserSearchResult, FriendAction } from "@/app/types/friendType";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
} from "../services/friendRequestService";

export const useFriendAcions = (
  searchResults: IUserSearchResult[],
  setSearchResults: React.Dispatch<React.SetStateAction<IUserSearchResult[]>>
) => {
  const handleFriendAction = async (action: FriendAction) => {
    const { type, id } = action;
    const previousState = searchResults;

    try {
      switch (type) {
        case "ADD":
          const res = await sendFriendRequest(id);
          const requestId = res.request._id;
          setSearchResults((prev) =>
            prev.map((user) =>
              user._id === id
                ? {
                    ...user,
                    isOutgoingRequest: true,
                    requestId,
                  }
                : user
            )
          );
          break;
        case "ACCEPT":
          await acceptFriendRequest(id);
          setSearchResults((prev) =>
            prev.map((user) =>
              user.requestId === id
                ? {
                    ...user,
                    isFriend: true,
                    isIncomingRequest: false,
                    isOutgoingRequest: false,
                    requestId: null,
                  }
                : user
            )
          );
          break;
        case "DECLINE":
          await declineFriendRequest(id);
          setSearchResults((prev) =>
            prev.map((user) =>
              user.requestId === id
                ? {
                    ...user,
                    isIncomingRequest: false,
                    requestId: null,
                  }
                : user
            )
          );
          break;
        case "CANCEL":
          await cancelFriendRequest(id);
          setSearchResults((prev) =>
            prev.map((user) =>
              user.requestId === id
                ? {
                    ...user,
                    isOutgoingRequest: false,
                    requestId: null,
                  }
                : user
            )
          );
          break;
      }
    } catch (err) {
      console.error(err);
      setSearchResults(previousState);
    }
  };

  return { handleFriendAction };
};
