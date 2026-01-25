export interface CreatePostPayload {
  content: String;
  visibility: "public" | "friends" | "private";
}

export interface UpdatePostPayload {
  postId: string;
  content: string;
  visibility: "public" | "friends" | "private";
}

export type Visibility = "public" | "friends" | "private";
export type PostFormMode = "create" | "edit";
export type SubmitState = "idle" | "submitting";

export interface PostFormProps {
  content: string;
  onContentChange: (value: string) => void;
  visibility: Visibility;
  onVisibilityChange: (value: Visibility) => void;
  mode: PostFormMode;
  submitState: SubmitState;
  onSubmit: () => void;
  onCancel?: () => void;
  error?: Error | null;
};

export interface EditPostModalProps{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}