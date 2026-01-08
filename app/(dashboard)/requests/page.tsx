"use client";
import { useFriendRequestMutations } from "@/app/hooks/useFriendRequestMutations";
import { useFriendRequests } from "@/app/hooks/useFriendRequests";
import { IFriendRequest } from "@/app/types/friendType";
import { useRouter } from "next/navigation";

const FriendRequests = () => {
  const {data: requests = [], isLoading} = useFriendRequests();
  const {accept, decline} = useFriendRequestMutations();
  const router = useRouter();


  if(isLoading) return <p>Loading...</p>

  return (
    <div className="main-content-border">
      <h1>FriendRequests</h1>
      {requests.length === 0 ? (
        <div>You have no friend requests</div>
      ) : (
        <div>
          {requests.map((req: IFriendRequest) => (
            <div className="flex" key={req._id}>
              <p onClick={()=> router.push(`/profile/${req.from._id}`)}>{req.from.name}</p>
              <button onClick={() => accept.mutate(req._id)}>
                Accept
              </button>
              <button onClick={() => decline.mutate(req._id)}>
                Decline
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
