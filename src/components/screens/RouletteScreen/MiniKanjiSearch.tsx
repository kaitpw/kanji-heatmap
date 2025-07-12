import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KanjiItemButton } from "@/components/sections/KanjiHoverItem/KanjiItemButton";
import { useKanjiSearch } from "@/kanji-worker/kanji-worker-hooks";
import KaomojiLoading from "@/components/common/KaomojiLoading";
import { ErrorBoundary } from "@/components/error";
import {
    defaultFilterSettings,
    defaultSearchTextSettings,
    defaultSortSettings,
} from "@/lib/settings/search-settings-adapter";
import { hasKanji } from "@/lib/wanakana-adapter";
import type { SearchType } from "@/lib/settings/settings";
import { KanjiDrawer } from "@/components/screens/ListScreen/Drawer/KanjiDrawer";

interface MiniKanjiSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const INPUT_DEBOUNCE_TIME = 300;

export const MiniKanjiSearch = ({ isOpen, onClose }: MiniKanjiSearchProps) => {
    const [searchText, setSearchText] = useState("");
    const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const defaultSearchSettings = useMemo(
        () => ({
            textSearch: defaultSearchTextSettings,
            filterSettings: defaultFilterSettings,
            sortSettings: defaultSortSettings,
        }),
        [],
    );
    const [localSearchSettings, setLocalSearchSettings] = useState(
        defaultSearchSettings,
    );

    // Only search when there's actual text
    const kanjiResult = useKanjiSearch(localSearchSettings);

    const clearSearch = () => {
        setSearchText("");
        setLocalSearchSettings(defaultSearchSettings);
    };

    const handleKanjiClick = (kanji: string) => {
        setSelectedKanji(kanji);
    };

    const handleDrawerClose = () => {
        setSelectedKanji(null);
    };

    // Debounced search trigger
    const triggerSearch = (
        text: string,
        searchType: SearchType = "keyword",
    ) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (text.trim()) {
                setLocalSearchSettings((
                    prev: typeof defaultSearchSettings,
                ) => ({
                    ...prev,
                    textSearch: {
                        type: searchType,
                        text: text.trim(),
                    },
                }));
            } else {
                // Reset to default when no text
                setLocalSearchSettings(defaultSearchSettings);
            }
        }, INPUT_DEBOUNCE_TIME);
    };

    // Handle immediate text update and debounced search
    const handleTextChange = (text: string) => {
        setSearchText(text); // Update display immediately

        // Determine search type based on content
        let searchType: SearchType = "keyword";
        if (hasKanji(text)) {
            searchType = "multi-kanji";
        }

        triggerSearch(text, searchType);
    };

    // Handle paste with immediate search (like main search input)
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        if (!clipboardData) {
            return;
        }

        const processedText = clipboardData.getData("text/plain").trim();

        if (processedText.length === 0) {
            return;
        }

        // For kanji, trigger immediate search with "multi-kanji" type
        if (hasKanji(processedText)) {
            setSearchText(processedText);
            setLocalSearchSettings((prev: typeof defaultSearchSettings) => ({
                ...prev,
                textSearch: {
                    type: "multi-kanji",
                    text: processedText,
                },
            }));
            return;
        }

        // For other text, use normal debounced behavior
        handleTextChange(processedText);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    if (!isOpen) return null;

    return (
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
                                <CardTitle className="text-lg">
                                    Quick Kanji Search
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                >
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
                                    onChange={(e) =>
                                        handleTextChange(e.target.value)}
                                    onPaste={handlePaste}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">
                                        Results
                                    </h3>
                                    {kanjiResult.data && searchText && (
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
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
                                            : kanjiResult.data &&
                                                    kanjiResult.data.length > 0
                                            ? (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {kanjiResult.data.map((
                                                        kanji,
                                                    ) => (
                                                        <KanjiItemButton
                                                            key={kanji}
                                                            kanji={kanji}
                                                            disableUrlUpdate={true}
                                                            onClick={() =>
                                                                handleKanjiClick(
                                                                    kanji,
                                                                )}
                                                        />
                                                    ))}
                                                </div>
                                            )
                                            : (
                                                <div className="text-sm text-muted-foreground p-2 text-center">
                                                    No kanji found for
                                                    "{searchText}"
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
};
