import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KanjiItemButton } from "@/components/sections/KanjiHoverItem/KanjiItemButton";
import KaomojiLoading from "@/components/common/KaomojiLoading";
import { ErrorBoundary } from "@/components/error";
import {
  defaultFilterSettings,
  defaultSortSettings,
} from "@/lib/settings/search-settings-adapter";
import { hasKanji } from "@/lib/wanakana-adapter";
import type { SearchType } from "@/lib/settings/settings";
import { KanjiDrawer } from "@/components/screens/ListScreen/Drawer/KanjiDrawer";
import KANJI_WORKER_SINGLETON from "@/kanji-worker/kanji-worker-promise-wrapper";

interface MiniKanjiSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const INPUT_DEBOUNCE_TIME = 150;

// Custom hook for direct worker calls - bypasses the expensive useKanjiSearch
const useDirectKanjiSearch = () => {
  const [state, setState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    data?: string[];
    error?: string | null;
  }>({ status: "idle" });

  const currentSearchRef = useRef<string>("");

  const search = useCallback((searchText: string, searchType: SearchType) => {
    // Track this search
    currentSearchRef.current = searchText;

    // Set loading immediately
    setState({ status: "loading" });

    const searchSettings = {
      textSearch: {
        type: searchType,
        text: searchText,
      },
      filterSettings: defaultFilterSettings,
      sortSettings: defaultSortSettings,
    };

    KANJI_WORKER_SINGLETON.request({
      type: "search",
      payload: searchSettings,
    })
      .then((result: unknown) => {
        const newData = result as { kanjis: string[] };

        // Only update if this is still the current search
        if (currentSearchRef.current === searchText) {
          setState({
            status: "success",
            data: newData.kanjis,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (currentSearchRef.current === searchText) {
          setState({ status: "error", error: error.message });
        }
      });
  }, []);

  const clear = useCallback(() => {
    currentSearchRef.current = "";
    setState({ status: "idle" });
  }, []);

  return { state, search, clear };
};

const MiniKanjiSearchComponent = ({
  isOpen,
  onClose,
}: MiniKanjiSearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { state: kanjiResult, search, clear } = useDirectKanjiSearch();

  const handleKanjiClick = useCallback((kanji: string) => {
    setSelectedKanji(kanji);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setSelectedKanji(null);
  }, []);

  // Debounced search trigger
  const triggerSearch = useCallback(
    (text: string, newSearchType: SearchType = "keyword") => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (text.trim()) {
          search(text.trim(), newSearchType);
        } else {
          clear();
        }
      }, INPUT_DEBOUNCE_TIME);
    },
    [search, clear],
  );

  // Handle immediate text update and debounced search
  const handleTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      const newSearchType: SearchType = hasKanji(text)
        ? "multi-kanji"
        : "keyword";
      triggerSearch(text, newSearchType);
    },
    [triggerSearch],
  );

  // Handle paste with immediate search
  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const clipboardData = event.clipboardData;

      if (!clipboardData) {
        return;
      }

      const processedText = clipboardData.getData("text/plain").trim();

      if (processedText.length === 0) {
        return;
      }

      // Set search text immediately
      setSearchText(processedText);

      // For kanji, trigger immediate search
      if (hasKanji(processedText)) {
        search(processedText, "multi-kanji");
      } else {
        search(processedText, "keyword");
      }
    },
    [search],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div
          className="fixed right-0 top-0 h-full w-96 bg-background shadow-lg border-l"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Card className="h-full rounded-none border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Quick Kanji Search</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter kanji to search..."
                  value={searchText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  onPaste={handlePaste}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-base"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Results</h3>
                  {kanjiResult.data && searchText && (
                    <Badge variant="outline" className="text-xs">
                      {kanjiResult.data.length} kanji
                    </Badge>
                  )}
                </div>

                <ErrorBoundary details="MiniKanjiSearch results">
                  <div className="space-y-2 max-h-96 overflow-none">
                    {!searchText
                      ? (
                        <div className="text-sm text-muted-foreground p-2 text-center">
                          Enter kanji to search
                        </div>
                      )
                      : kanjiResult.status === "loading"
                      ? (
                        <div className="flex items-center justify-center py-8">
                          <KaomojiLoading />
                        </div>
                      )
                      : kanjiResult.error
                      ? (
                        <div className="text-sm text-destructive p-2">
                          Error loading results
                        </div>
                      )
                      : kanjiResult.data && kanjiResult.data.length > 0
                      ? (
                        <div className="grid grid-cols-3 gap-2">
                          {kanjiResult.data.map((kanji) => (
                            <KanjiItemButton
                              key={kanji}
                              kanji={kanji}
                              disableUrlUpdate={true}
                              onClick={() => handleKanjiClick(kanji)}
                            />
                          ))}
                        </div>
                      )
                      : (
                        <div className="text-sm text-muted-foreground p-2 text-center">
                          {`No kanji found for "${searchText}"`}
                        </div>
                      )}
                  </div>
                </ErrorBoundary>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Local kanji drawer that doesn't affect URL */}
      {selectedKanji && (
        <KanjiDrawer
          isOpen={selectedKanji !== null}
          onClose={handleDrawerClose}
          kanji={selectedKanji}
        />
      )}
    </>
  );

  return createPortal(modalContent, document.body);
};

export const MiniKanjiSearch = memo(MiniKanjiSearchComponent);
