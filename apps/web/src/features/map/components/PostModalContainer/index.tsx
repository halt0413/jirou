// app/(...) /components/post-modal/PostModal.tsx
"use client";

import { PostModalView } from "../PostModalView";
import { usePostModal } from "../../hooks/usePostModal";

type Props = {
  storeName: string;
  onClose: () => void;
  onPosted?: (postId: number) => void;
};

export default function PostModal({ storeName, onClose, onPosted }: Props) {
  const vm = usePostModal(storeName, onClose, onPosted);

  return (
    <PostModalView
      storeName={storeName}
      onClose={onClose}
      score={vm.score}
      onScoreChange={vm.setScore}
      comment={vm.comment}
      onCommentChange={vm.setComment}
      imageKey={vm.imageKey}
      filePreviewUrl={vm.filePreviewUrl}
      onPickFile={vm.onPickFile}
      onRemoveFile={vm.removeFile}
      isSubmitting={vm.isSubmitting}
      err={vm.err}
      canSubmit={vm.canSubmit}
      onSubmit={vm.submit}
    />
  );
}