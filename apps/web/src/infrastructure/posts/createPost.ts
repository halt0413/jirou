export type CreatePostInput = {
  storeName: string;
  score: number; // 1-5
  comment?: string | null;
  imageKey?: string | null;
};

export type Post = {
  id: number;
  storeName: string;
  userId: string;
  score: number;
  comment: string | null;
  imageKey: string | null;
  createdAt: string;
};

export async function createPost(input: CreatePostInput): Promise<Post> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`createPost failed: ${res.status} ${text}`);
  }

  return (await res.json()) as Post;
}