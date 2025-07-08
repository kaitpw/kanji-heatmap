import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Volume2 } from "../icons";

interface AudioButtonProps {
    audioUrl: string;
    iconType?: "play" | "volume";
    size?: "sm" | "default";
}

export const AudioButton = ({
    audioUrl,
    iconType = "play",
    size = "default",
}: AudioButtonProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const getIcon = () => {
        if (isLoading) {
            return (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
            );
        }

        if (isPlaying) {
            return <Volume2 />;
        }

        return iconType === "play" ? <Play /> : <Volume2 />;
    };

    const handlePlay = useCallback(async () => {
        if (isPlaying && audio) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);

        try {
            // Create full URL if it's a relative path
            const fullUrl = audioUrl.startsWith("http")
                ? audioUrl
                : `https://receptomanijalogi.web.app/audio/${audioUrl}`;

            const newAudio = new Audio(fullUrl);

            newAudio.addEventListener("loadeddata", () => {
                setIsLoading(false);
                setIsPlaying(true);
            });

            newAudio.addEventListener("ended", () => {
                setIsPlaying(false);
                setAudio(null);
            });

            newAudio.addEventListener("error", (e) => {
                console.error("Audio playback error:", e);
                setIsLoading(false);
                setIsPlaying(false);
                setAudio(null);
            });

            setAudio(newAudio);
            await newAudio.play();
        } catch (error) {
            console.error("Failed to play audio:", error);
            setIsLoading(false);
            setIsPlaying(false);
        }
    }, [audioUrl, isPlaying, audio]);

    const buttonSize = size === "sm" ? "sm" : "default";
    const buttonClass = size === "sm"
        ? "h-6 w-6 relative rounded-lg"
        : "h-8 w-8 relative rounded-xl";

    return (
        <Button
            variant="outline"
            size={buttonSize}
            className={buttonClass}
            onClick={handlePlay}
            disabled={isLoading}
        >
            {getIcon()}
        </Button>
    );
};
