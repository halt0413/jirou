"use client";

import styles from "./index.module.css";

function Stars({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((v) => {
        const active = v <= value;
        return (
          <button
            key={v}
            type="button"
            disabled={disabled}
            onClick={() => onChange(v)}
            aria-label={`${v} star`}
            className={`${styles.starBtn} ${active ? styles.starBtnActive : ""}`}
          >
            ★
          </button>
        );
      })}
      <div className={styles.starsValue}>{value}.0</div>
    </div>
  );
}

export type PostModalViewProps = {
  storeName: string;
  onClose: () => void;

  score: number;
  onScoreChange: (v: number) => void;

  comment: string;
  onCommentChange: (v: string) => void;

  imageKey: string | null;
  filePreviewUrl: string | null;
  onPickFile: (file: File | null) => void;
  onRemoveFile: () => void;

  isSubmitting: boolean;
  err: string | null;
  canSubmit: boolean;

  onSubmit: () => void;
};

export function PostModalView({
  storeName,
  onClose,
  score,
  onScoreChange,
  comment,
  onCommentChange,
  filePreviewUrl,
  onPickFile,
  onRemoveFile,
  isSubmitting,
  err,
  canSubmit,
  onSubmit,
}: PostModalViewProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.ticketLabel}>TICKET</div>
            <div className={styles.title}>口コミ投稿</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className={styles.closeBtn}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Store */}
          <div className={styles.card}>
            <div className={styles.punchHole} />
            <div className={styles.cardLabel}>SELECTED STORE</div>
            <div className={styles.storeName}>{storeName}</div>
          </div>

          {/* Rating */}
          <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
              <div className={styles.cardLabel}>やさしさ度合い</div>
              <div className={styles.cardHint}>★1〜★5</div>
            </div>
            <Stars value={score} onChange={onScoreChange} disabled={isSubmitting} />
          </div>

          {/* Comment */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>コメント（任意）</div>
            <textarea
              className={styles.textarea}
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              rows={4}
              placeholder="例：ヤサイマシ、アブラうまい。接客も神。"
              disabled={isSubmitting}
            />
          </div>

          {/* Image */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>画像（任意）</div>

            <div className={styles.imageArea}>
              <input
                className={styles.fileInput}
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              />

              {filePreviewUrl && (
                <div className={styles.previewBox}>
                  <img className={styles.previewImg} src={filePreviewUrl} alt="preview" />
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    disabled={isSubmitting}
                    onClick={onRemoveFile}
                  >
                    画像を外す
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {err && <div className={styles.errorBox}>{err}</div>}

          {/* Footer Buttons */}
          <div className={styles.footer}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose} disabled={isSubmitting}>
              やめる
            </button>

            <button type="button" className={styles.primaryBtn} onClick={onSubmit} disabled={!canSubmit}>
              {isSubmitting ? "発券中…" : "発券して投稿"}
            </button>
          </div>

          <div className={styles.perfLine} />
        </div>
      </div>
    </div>
  );
}