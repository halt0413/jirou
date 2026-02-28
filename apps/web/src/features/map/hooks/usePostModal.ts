"use client";

import { useMemo, useState } from "react";
import { createPost } from "@/infrastructure/posts/createPost";

export type PostModalPayload = {
  storeName: string;
  score: number;
  comment?: string;
  imageKey?: string | null;
};

export function usePostModal(storeName: string, onClose: () => void, onPosted?: (postId: number) => void) {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");
  const [imageKey, setImageKey] = useState<string | null>(null);

  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => score >= 1 && score <= 5 && !isSubmitting, [score, isSubmitting]);

  const onPickFile = (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFilePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    // 画像アップロードAPI未実装なので一旦null
    setImageKey(null);
  };

  const removeFile = () => {
    setFilePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setImageKey(null);
  };

  const submit = async () => {
    setErr(null);
    setIsSubmitting(true);

    try {
      const payload: PostModalPayload = {
        storeName,
        score,
        comment: comment.trim() ? comment.trim() : undefined,
        imageKey: imageKey ?? undefined,
      };

      const post = await createPost(payload);
      onPosted?.(post.id);
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // state
    score,
    comment,
    imageKey,
    filePreviewUrl,
    isSubmitting,
    err,
    canSubmit,

    // actions
    setScore,
    setComment,
    setImageKey,
    onPickFile,
    removeFile,
    submit,
  };
}