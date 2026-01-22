export interface CreatePostPayload{
    content: String;
    visibility: "public" | "friends" | "private";
}