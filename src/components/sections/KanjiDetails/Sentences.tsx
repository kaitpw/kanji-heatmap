import { useSentenceSearch } from "@/kanji-worker/kanji-worker-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TtsSpeakButton } from "@/components/common/SpeakButton";
import { AudioButton } from "@/components/common/AudioButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";

interface SentencesProps {
  kanji: string;
}

type SortOption = "original" | "length-asc" | "length-desc";

export const Sentences = ({ kanji }: SentencesProps) => {
  const sentenceResult = useSentenceSearch(kanji);
  const [sortBy, setSortBy] = useState<SortOption>("original");

  const sortedSentences = useMemo(() => {
    if (!sentenceResult.data?.sentences) return [];

    const sentences = [...sentenceResult.data.sentences];

    switch (sortBy) {
      case "length-asc":
        return sentences.sort((a, b) => a.jap.length - b.jap.length);
      case "length-desc":
        return sentences.sort((a, b) => b.jap.length - a.jap.length);
      default:
        return sentences;
    }
  }, [sentenceResult.data?.sentences, sortBy]);

  if (sentenceResult.status === "loading") {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
            <span className="text-sm text-muted-foreground">
              Loading sentences...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sentenceResult.status === "error") {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load sentences: {sentenceResult.error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!sentenceResult.data || sentenceResult.data.sentences.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No sample sentences found for this kanji.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { totalCount } = sentenceResult.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original Order</SelectItem>
                <SelectItem value="length-asc">Shortest first</SelectItem>
                <SelectItem value="length-desc">Longest first</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">
              {sortedSentences.length} of {totalCount}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSentences.map((sentence, index) => (
          <div key={`${sentence.jap}-${index}`} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-lg leading-relaxed kanji-font">
                    {sentence.jap}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{sentence.eng}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {sentence.source}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {sentence.jap.length} chars
              </Badge>
              {sentence.audio_jap && (
                <AudioButton
                  audioUrl={sentence.audio_jap}
                  iconType="play"
                  size="sm"
                />
              )}
              <TtsSpeakButton
                text={sentence.jap}
                iconType="audio-lines"
                directText={true}
              />
            </div>
            {index < sortedSentences.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
