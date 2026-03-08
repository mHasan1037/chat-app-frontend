"use client";
import { useFriendRequestMutations } from "@/app/hooks/useFriendRequestMutations";
import { useFriendRequests } from "@/app/hooks/useFriendRequests";
import { IFriendRequest } from "@/app/types/friendType";
import { useRouter } from "next/navigation";

const FriendRequests = () => {
  const { data: requests = [], isLoading } = useFriendRequests();
  const { accept, decline } = useFriendRequestMutations();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-xl font-bold mb-6 border-b border-color pb-3">FriendRequests</h1>
      {requests.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          You have no friend requests
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req: IFriendRequest) => (
            <div
              className="flex items-center justify-between p-4 rounded-lg"
              key={req._id}
            >
              <p
                className="cursor-pointer hover:underline"
                onClick={() => router.push(`/profile/${req.from._id}`)}
              >
                {req.from.name}
              </p>
              <div className="flex gap-3">
                <button className="action-btn action-btn-blue" onClick={() => accept.mutate(req._id)}>Accept</button>
                <button className="action-btn action-btn-red" onClick={() => decline.mutate(req._id)}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
