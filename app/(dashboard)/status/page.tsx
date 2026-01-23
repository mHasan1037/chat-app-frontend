"use client"
import CreatePost from '@/app/components/CreatePost'
import PostItem from '@/app/components/PostItem';
import { useFeedPosts } from '@/app/hooks/useFeedPosts'
import React, { useEffect, useRef } from 'react'

const StatusPage = () => {
  const {data: feedPost, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useFeedPosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
     if(!observerRef.current || !hasNextPage) return;

     const observer = new IntersectionObserver(
       (entries) =>{
         if(entries[0].isIntersecting){
          fetchNextPage()
         }
       },
       {threshold: 1}
     );
     observer.observe(observerRef.current);

     return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if(status === "pending"){
    return <p className='text-center'>Loading feed...</p>
  };

  return (
    <div className="main-content-border max-w-xl mx-auto space-y-4">
      <CreatePost />

      {feedPost?.pages.map((page, pageIndex) =>(
        <div key={pageIndex} className="space-y-4">
          {page.posts.map((post: any) =>(
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="flex justify-center py-4">
            {isFetchingNextPage && <span className="text-sm text-gray-500">Loading more…</span>}
        </div>
      )}
    </div>
  )
}

export default StatusPage