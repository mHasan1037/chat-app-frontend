import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfilePicture } from "../services/userService";

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfilePicture,
    onMutate: async (public_id: string) => {
      await queryClient.cancelQueries({ queryKey: ["user-profile"] });

      const previousProfile = queryClient.getQueryData(["user-profile"]);

      queryClient.setQueryData(["user-profile"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          allProfilePictures: old.allProfilePictures.filter(
            (img: any) => img.public_id !== public_id,
          ),
          ...(old.profilePicturePublicId === public_id
            ? { profilePicture: "", profilePicturePublicId: "" }
            : {}),
        };
      });

      return { previousProfile };
    },
    onError: (err, public_id, context) => {
      queryClient.setQueryData(["user-profile"], context?.previousProfile);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
