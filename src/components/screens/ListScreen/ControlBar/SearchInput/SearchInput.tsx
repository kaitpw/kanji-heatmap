import { Search } from "lucide-react";
import { useRef, useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import * as wanakana from "wanakana";
import { cn } from "@/lib/utils";
import { SEARCH_TYPE_OPTIONS, SearchType } from "@/lib/settings";

const INPUT_DEBOUNCE_TIME = 1000;

const INPUT_CLASS =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-7 pr-[105px] h-9";

const SEARCH_ICON_CLASS =
  "pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50";

const SELECT_CLASS =
  "absolute right-1 top-1 w-26 h-7 bg-gray-100 dark:bg-gray-900";

export const SearchInput = ({
  onSettle,
}: {
  onSettle: (searchText: string, searchType: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<SearchType>("keyword");
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleChange = (searchType: SearchType, text: string) => {
    if (inputRef.current == null) {
      return;
    }
    const formattedText =
      searchType === "kunyomi"
        ? wanakana.toHiragana(text)
        : searchType === "onyomi"
          ? wanakana.toKatakana(text)
          : wanakana.toRomaji(text);
    inputRef.current.value = formattedText;

    wanakana.bind(inputRef.current, {
      IMEMode:
        searchType === "kunyomi"
          ? "toHiragana"
          : searchType === "onyomi"
            ? "toKatakana"
            : undefined,
    });

    onSettle(inputRef.current?.value ?? "", searchType);
    setValue(searchType);
  };

  const placeHolder =
    value === "keyword"
      ? "Keyword Search"
      : value === "onyomi"
        ? "オンヨミ 検索"
        : "くんよみ 検索";

  const fontCN = value !== "keyword" ? "kanji-font" : "";
  const itemCNFunc = (v: string) => (v !== "keyword" ? "kanji-font" : "");

  return (
    <section className="w-full relative">
      <input
        className={cn(INPUT_CLASS, fontCN)}
        onChange={(e) => {
          // NOTE: this is based on https://react.dev/learn/referencing-values-with-refs
          // TODO: Read https://www.developerway.com/posts/debouncing-in-react
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            handleChange(value, e.target.value);
          }, INPUT_DEBOUNCE_TIME);
        }}
        placeholder={placeHolder}
        ref={inputRef}
      />
      <Search className={cn(SEARCH_ICON_CLASS)} />
      <BasicSelect
        value={value}
        onChange={(newValue) => {
          const searchType = newValue as SearchType;
          handleChange(searchType, inputRef.current?.value ?? "");
        }}
        triggerCN={cn(SELECT_CLASS, fontCN)}
        selectItemCNFunc={itemCNFunc}
        options={SEARCH_TYPE_OPTIONS}
        label="Search Type"
        isLabelSrOnly={true}
      />
    </section>
  );
};
