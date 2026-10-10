"use client"
import CreatePost from '@/app/components/CreatePost'
import PostItem from '@/app/components/PostItem';
import { useAuthUser } from '@/app/hooks/useAuthUser';
import { useFeedPosts } from '@/app/hooks/useFeedPosts'
import React, { useEffect, useRef } from 'react'

const StatusPage = () => {
  const {data: feedPost, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useFeedPosts();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const myUserId = useAuthUser().data?._id;

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
    return <p className='py-10 text-center text-sm font-medium text-slate-500'>Loading feed...</p>
  };

  return (
    <div className="mx-auto my-6 max-w-xl space-y-4">
      <CreatePost />

      {feedPost?.pages.map((page, pageIndex) =>(
        <div key={pageIndex} className="space-y-4">
          {page.posts.map((post: any) =>(
            <PostItem key={post._id} post={post} canEdit={post.author?._id === myUserId}/>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="flex justify-center py-4">
            {isFetchingNextPage && <span className="text-sm font-medium text-slate-500">Loading more…</span>}
        </div>
      )}
    </div>
  )
}

export default StatusPage
