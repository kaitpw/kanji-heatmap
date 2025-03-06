import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import * as wanakana from "wanakana";
import { cn } from "@/lib/utils";
import { SEARCH_TYPE_OPTIONS, SearchType } from "@/lib/settings";
import { useKanjiSearchResult } from "@/kanji-worker/kanji-worker-provider";

const INPUT_DEBOUNCE_TIME = 1000;

const INPUT_CLASS =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-7 pr-[105px] h-9";

const SEARCH_ICON_CLASS =
  "pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50";

const SELECT_CLASS =
  "absolute right-1 top-1 w-26 h-7 bg-gray-100 dark:bg-gray-900";

export const ItemCountBadge = () => {
  const result = useKanjiSearchResult();
  if (result.data == null) {
    return <></>;
  }
  return (
    <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
      {result.data?.length} items match your search filters
    </div>
  );
};

export const SearchInput = ({
  onSettle,
}: {
  onSettle: (searchText: string, searchType: string) => void;
}) => {
  // FIX ME: Put proper types here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>();
  const [value, setValue] = useState<SearchType>("keyword");
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const currentValue = inputRef?.current?.value ?? "";

    if (inputRef.current?.value == null) {
      return;
    }

    if (value === "keyword") {
      inputRef.current.value = wanakana.toRomaji(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.warn("cannot unbind romaji");
      }
      return;
    }

    if (value === "onyomi") {
      const newValue = wanakana.toKatakana(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.warn("cannot unbind to onyomi");
      }
      inputRef.current.value = newValue;
      wanakana.bind(inputRef.current, { IMEMode: "toKatakana" });
      return;
    }

    if (value === "kunyomi") {
      const newValue = wanakana.toHiragana(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.warn("cannot unbind to kunyomi");
      }
      inputRef.current.value = newValue;
      wanakana.bind(inputRef.current, { IMEMode: "toHiragana" });
      return;
    }

    // 👇👇👇 Question: do we beed to do this below for cleanup or no longer needed ??? 👇👇👇👇
    // const currentInput = inputRef.current;
    //    return () => {
    //      if (currentInput != null) {
    //        console.log("unbind on clean up");
    //        wanakana.unbind(currentInput);
    //      }
    //    };
  }, [value]);

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
            onSettle(e.target.value, value);
          }, INPUT_DEBOUNCE_TIME);
        }}
        placeholder={placeHolder}
        ref={inputRef}
      />
      <Search className={cn(SEARCH_ICON_CLASS)} />
      <BasicSelect
        value={value}
        onChange={(newValue) => setValue(newValue as SearchType)}
        triggerCN={cn(SELECT_CLASS, fontCN)}
        selectItemCNFunc={itemCNFunc}
        options={SEARCH_TYPE_OPTIONS}
        label="Search Type"
        isLabelSrOnly={true}
      />
      <ItemCountBadge />
    </section>
  );
};
