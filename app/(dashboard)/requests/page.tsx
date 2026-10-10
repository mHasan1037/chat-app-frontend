"use client";
import { useFriendRequestMutations } from "@/app/hooks/useFriendRequestMutations";
import { useFriendRequests } from "@/app/hooks/useFriendRequests";
import { IFriendRequest } from "@/app/types/friendType";
import { useRouter } from "next/navigation";

const FriendRequests = () => {
  const { data: requests = [], isLoading } = useFriendRequests();
  const { accept, decline } = useFriendRequestMutations();
  const router = useRouter();

  if (isLoading) return <p className="py-10 text-center text-sm font-medium text-slate-500">Loading...</p>;

  return (
    <div className="main-content-border">
      <div className="border-b border-white/70 pb-4">
        <h1 className="text-2xl font-black text-slate-950">Friend Requests</h1>
        <p className="text-sm font-medium text-slate-500">Review who wants to connect.</p>
      </div>
      {requests.length === 0 ? (
        <div className="rounded-2xl bg-white/70 py-10 text-center text-sm font-medium text-slate-500">
          You have no friend requests
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req: IFriendRequest) => (
            <div
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm"
              key={req._id}
            >
              <p
                className="cursor-pointer font-bold text-slate-800 hover:text-blue-600"
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
