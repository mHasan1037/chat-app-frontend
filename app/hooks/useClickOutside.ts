import { useEffect } from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void
){
  useEffect(()=>{
     const listener = (event: MouseEvent) =>{
        const el = ref.current;

        if(!el || el.contains(event.target as Node)) return;

        handler(event);
     }

     document.addEventListener('mousedown', listener);

     return ()=>{
        document.removeEventListener('mousedown', listener);
     }
  }, [ref, handler])
}