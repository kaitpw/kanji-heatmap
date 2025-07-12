import { useCallback, useState } from "react";

export const useSpeak = (word: string, options?: { directText?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const speakWithOpenAI = useCallback(
    async (text: string) => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        console.warn(
          "OpenAI API key not found, falling back to SpeechSynthesis",
        );
        return false;
      }

      try {
        // Use direct text for sentences, dynamic format for words/sounds
        const textToSpeak = options?.directText
          ? text
          : `言い方は:${text}、${text}`;

        const response = await fetch(
          "https://api.openai.com/v1/audio/speech",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o-mini-tts",
              input: textToSpeak,
              voice: "nova",
              response_format: "mp3",
              instructions:
                "Speak in a clear, natural Japanese tone with proper pronunciation.",
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        await audio.play();

        // Clean up the URL after playing
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };

        return true;
      } catch (error) {
        console.error("OpenAI TTS failed:", error);
        return false;
      }
    },
    [options?.directText],
  );

  const speakWithSpeechSynthesis = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    // Find a Japanese voice (if available)
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find((voice) => voice.lang === "ja-JP");
    if (japaneseVoice) utterance.voice = japaneseVoice;

    window.speechSynthesis.speak(utterance);
  }, []);

  const speak = useCallback(async () => {
    setIsLoading(true);

    try {
      // Try OpenAI first
      const success = await speakWithOpenAI(word);

      // If OpenAI fails, fall back to SpeechSynthesis
      if (!success) {
        speakWithSpeechSynthesis(word);
      }
    } catch (error) {
      console.error("Speech failed:", error);
      // Fall back to SpeechSynthesis
      speakWithSpeechSynthesis(word);
    } finally {
      setIsLoading(false);
    }
  }, [word, speakWithOpenAI, speakWithSpeechSynthesis]);

  return { speak, isLoading };
};
