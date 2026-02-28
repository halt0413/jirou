const ZUNDAMON_SPEAKER_ID = 3;

const getVoicevoxBaseUrl = () => {
  const base = process.env.NEXT_PUBLIC_VOICEVOX_BASE_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_VOICEVOX_BASE_URL が未設定です");
  }
  const trimmed = base.replace(/\/$/, "");
  return trimmed.endsWith("/voicevox") ? trimmed : `${trimmed}/voicevox`;
};

export const speakCallLines = async (text: string) => {
  const baseUrl = getVoicevoxBaseUrl();

  const queryRes = await fetch(
    `${baseUrl}/audio_query?text=${encodeURIComponent(text)}&speaker=${ZUNDAMON_SPEAKER_ID}`,
    { method: "POST" }
  );

  if (!queryRes.ok) {
    throw new Error("音声クエリの取得に失敗しました");
  }

  const audioQuery = await queryRes.json();

  const synthRes = await fetch(
    `${baseUrl}/synthesis?speaker=${ZUNDAMON_SPEAKER_ID}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(audioQuery),
    }
  );

  if (!synthRes.ok) {
    throw new Error("音声合成に失敗しました");
  }

  const audioBlob = await synthRes.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);

  audio.addEventListener("ended", () => {
    URL.revokeObjectURL(audioUrl);
  });

  await audio.play();
};
