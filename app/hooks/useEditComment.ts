import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "../services/commentService";

export const useEditComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editComment,
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousData = queryClient.getQueryData(["comments", postId]);

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            comments: page.comments.map((c: any) =>
              c._id === commentId ? { ...c, content } : c,
            ),
          })),
        };
      });
      return {previousData}
    },

    onError: (_err, _vars, context) =>{
        queryClient.setQueryData(
            ['comments', postId],
            context?.previousData
        )
    },

    onSettled: () =>{
        queryClient.invalidateQueries({queryKey: ['comments', postId]})
    }
  });
};
