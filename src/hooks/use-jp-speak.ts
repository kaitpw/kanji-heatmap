import { useCallback, useState } from "react";

interface ElevenLabsResponse {
  audio: string; // base64 encoded audio
}

export const useSpeak = (word: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const speakWithElevenLabs = useCallback(async (text: string) => {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.warn(
        "ElevenLabs API key not found, falling back to SpeechSynthesis",
      );
      return false;
    }

    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/j210dv0vWm7fCknyQpbA?optimize_streaming_latency=0",
        {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: `「${text}」。。。「${text}」`,
            model_id: "eleven_turbo_v2_5",
            language_code: "ja",
            voice_settings: {},
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
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
      console.error("ElevenLabs TTS failed:", error);
      return false;
    }
  }, []);

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
      // Try ElevenLabs first
      const success = await speakWithElevenLabs(word);

      // If ElevenLabs fails, fall back to SpeechSynthesis
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
  }, [word, speakWithElevenLabs, speakWithSpeechSynthesis]);

  return { speak, isLoading };
};
