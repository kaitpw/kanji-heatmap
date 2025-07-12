import { useCallback, useMemo, useState } from "react";
import {
  useAllSentences,
  useKanjiSearchResult,
} from "@/kanji-worker/kanji-worker-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TtsSpeakButton } from "@/components/common/SpeakButton";
import { AudioButton } from "@/components/common/AudioButton";
import { KanjiItemButton } from "@/components/sections/KanjiHoverItem/KanjiItemButton";
import { DefaultErrorFallback, ErrorBoundary } from "@/components/error";
import KaomojiLoading from "@/components/common/KaomojiLoading";
import type { Sentence } from "@/lib/kanji/kanji-worker-types";
import KanjiDrawerGlobal from "@/components/screens/ListScreen/Drawer/KanjiDrawerGlobal";
import { useSearchSettings } from "@/providers/search-settings-hooks";
import ItemPresentationSettingsPopover from "../ListScreen/ControlBar/ItemPresentation/ItemPresentationPopover";
import { SettledSortAndFilter } from "../ListScreen/ControlBar/SortAndFilter/SettledSortAndFilter";
import { ItemPresentationSettingsContent } from "../ListScreen/ControlBar/ItemPresentation/ItemPresentationContent";
import { MiniKanjiSearch } from "./MiniKanjiSearch";
import { Search } from "@/components/icons";

type RouletteMode = "kanji" | "sentences";

interface RouletteItem {
  type: "kanji" | "sentence";
  data: string | Sentence;
}

const RouletteScreen = () => {
  const [mode, setMode] = useState<RouletteMode>("sentences");
  const [items, setItems] = useState<RouletteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const kanjiResult = useKanjiSearchResult();
  const allSentencesResult = useAllSentences();
  const searchSettings = useSearchSettings();

  // Get random kanji based on current filters
  const getRandomKanji = useCallback(() => {
    if (kanjiResult.data && kanjiResult.data.length > 0) {
      const shuffled = [...kanjiResult.data].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 10).map((kanji: string) => ({
        type: "kanji" as const,
        data: kanji,
      }));
    }
    return [];
  }, [kanjiResult.data]);

  // Get random sentences
  const getRandomSentences = useCallback(() => {
    console.log("getRandomSentences called", {
      data: allSentencesResult.data,
      length: allSentencesResult.data?.length,
      status: allSentencesResult.status,
    });
    if (allSentencesResult.data && allSentencesResult.data.length > 0) {
      const shuffled = [...allSentencesResult.data].sort(
        () => Math.random() - 0.5,
      );
      return shuffled.slice(0, 10).map((sentence) => ({
        type: "sentence" as const,
        data: sentence,
      }));
    }
    return [];
  }, [allSentencesResult.data, allSentencesResult.status]);

  // Generate new roulette items
  const generateNewRound = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const newItems = mode === "kanji"
        ? getRandomKanji()
        : getRandomSentences();
      setItems(newItems);
      setIsLoading(false);
    }, 100); // Small delay for visual feedback
  }, [mode, getRandomKanji, getRandomSentences]);

  // Generate initial items when component mounts or mode changes
  useMemo(() => {
    if (
      kanjiResult.status === "success" &&
      allSentencesResult.status === "success"
    ) {
      setIsLoading(true);
      setTimeout(() => {
        const newItems = mode === "kanji"
          ? getRandomKanji()
          : getRandomSentences();
        setItems(newItems);
        setIsLoading(false);
      }, 100);
    }
  }, [
    kanjiResult.status,
    allSentencesResult.status,
    mode,
    getRandomKanji,
    getRandomSentences,
  ]);

  if (kanjiResult.error || allSentencesResult.error) {
    return <DefaultErrorFallback message="Failed to load data." />;
  }

  if (
    kanjiResult.status === "loading" ||
    kanjiResult.status === "idle" ||
    allSentencesResult.status === "loading" ||
    allSentencesResult.status === "idle"
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <KaomojiLoading />
      </div>
    );
  }

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={generateNewRound} disabled={isLoading}>
                {isLoading ? "Loading..." : "New Round"}
              </Button>
              <SettledSortAndFilter />
              <ItemPresentationSettingsPopover>
                <ErrorBoundary details="ItemPresentationSettingsContent in RouletteFilters">
                  <ItemPresentationSettingsContent />
                </ErrorBoundary>
              </ItemPresentationSettingsPopover>
              <div className="flex items-center space-x-2">
                <Switch
                  id="mode-switch"
                  checked={mode === "sentences"}
                  onCheckedChange={(checked) =>
                    setMode(checked ? "sentences" : "kanji")}
                />
                <Label htmlFor="mode-switch">
                  {mode === "kanji" ? "Kanji" : "Sentences"}
                </Label>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Current filters: {searchSettings.filterSettings.jlpt.length > 0
              ? `JLPT ${searchSettings.filterSettings.jlpt.join(", ")}`
              : "All JLPT levels"} • Strokes:{" "}
            {searchSettings.filterSettings.strokeRange.min}-
            {searchSettings.filterSettings.strokeRange.max} • Frequency:{" "}
            {searchSettings.filterSettings.freq.source === "none"
              ? "All sources"
              : searchSettings.filterSettings.freq.source}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            {isLoading
              ? (
                <div className="flex items-center justify-center py-12">
                  <KaomojiLoading />
                </div>
              )
              : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, index) => (
                    <div
                      key={`${item.type}-${index}-${item.data}`}
                      className="border rounded-lg p-2"
                    >
                      {item.type === "kanji"
                        ? <KanjiItemButton kanji={item.data as string} />
                        : (
                          <div className="space-y-2">
                            <p className="text-lg leading-relaxed">
                              {(item.data as Sentence).jap}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(item.data as Sentence).eng}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {(item.data as Sentence).source}
                              </Badge>
                              {(() => {
                                const sentence = item.data as Sentence;
                                return sentence.audio_jap
                                  ? (
                                    <AudioButton
                                      audioUrl={sentence.audio_jap}
                                      iconType="play"
                                      size="sm"
                                    />
                                  )
                                  : null;
                              })()}
                              <TtsSpeakButton
                                text={(item.data as Sentence).jap}
                                iconType="audio-lines"
                                directText={true}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Floating Search Button */}
      <Button
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-40"
        size="icon"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Open Kanji Search</span>
      </Button>

      <KanjiDrawerGlobal />
      <MiniKanjiSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default RouletteScreen;
