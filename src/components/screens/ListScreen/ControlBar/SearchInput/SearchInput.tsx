import { useRef, useState } from "react";
import { cn } from "@/lib/generic-utils";
import { SearchType } from "@/lib/settings/settings";
import {
  placeholderMap,
  SEARCH_TYPE_OPTIONS,
  translateMap,
} from "@/lib/search-input-maps";
import { translateValue } from "@/lib/wanakana-adapter";
import { Search } from "@/components/icons";
import BasicSelect from "@/components/common/BasicSelect";

const INPUT_DEBOUNCE_TIME = 1000;

const INPUT_CLASS =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-7 pr-[105px] h-9";

const SEARCH_ICON_CLASS =
  "pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50";

const SELECT_CLASS =
  "absolute right-1 top-1 w-26 h-7 bg-gray-100 dark:bg-gray-900";

export const SearchInput = ({
  initialSearchType = "keyword",
  initialText = "",
  onSettle,
}: {
  initialSearchType: SearchType;
  initialText: string;
  onSettle: (searchText: string, searchType: string) => void;
}) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchType, setSearchType] = useState(initialSearchType);
  const [parsedValue, setValue] = useState(
    translateValue(initialText, translateMap[searchType])
  );

  const fontCN =
    parsedValue === "" || searchType === "meanings" || searchType === "keyword"
      ? ""
      : "kanji-font";

  return (
    <section className="w-full relative">
      <input
        className={cn(INPUT_CLASS, fontCN)}
        value={parsedValue}
        onChange={(e) => {
          const updatedValue = translateValue(
            e.target.value,
            translateMap[searchType]
          );

          setValue(updatedValue);
          // NOTE: this is based on https://react.dev/learn/referencing-values-with-refs
          // TODO: Read https://www.developerway.com/posts/debouncing-in-react
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            onSettle(e.target.value.trim() ?? "", searchType);
          }, INPUT_DEBOUNCE_TIME);
        }}
        placeholder={placeholderMap[searchType]}
      />

      <Search className={cn(SEARCH_ICON_CLASS)} />
      <BasicSelect
        value={searchType}
        onChange={(val) => {
          const newType = val as SearchType;
          setSearchType(newType);
          const newParsedValue = translateValue(
            parsedValue,
            translateMap[newType]
          );
          setValue(newParsedValue);
          onSettle(newParsedValue.trim(), newType);
        }}
        triggerCN={SELECT_CLASS}
        options={SEARCH_TYPE_OPTIONS}
        label="Search Type"
        isLabelSrOnly={true}
      />
    </section>
  );
};
