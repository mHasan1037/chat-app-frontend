import React, { useEffect, useRef } from "react";
import { useUserPosts } from "../hooks/useUserPosts";
import PostItem from "./PostItem";
import { useAuthUser } from "../hooks/useAuthUser";

const ProfilePosts = ({ userId }: { userId: string }) => {
  const {
    data: allPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useUserPosts(userId);
  const myUserId = useAuthUser().data?._id;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === "pending") return <p>Loading posts...</p>;
  const hasPosts = allPosts?.pages?.some((page) => page.posts?.length > 0);

  return (
    <div className="space-y-4">
      {hasPosts ? (
        allPosts?.pages.map((page, pageIndex) => (
          <div key={pageIndex} className="space-y-4">
            {page.posts.map((post: any) => (
              <PostItem
                key={post._id}
                post={post}
                canEdit={myUserId === post.author?._id}
              />
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts</p>
      )}
      {hasNextPage && (
        <div ref={observerRef}>
          {isFetchingNextPage && <p>Loading more...</p>}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
