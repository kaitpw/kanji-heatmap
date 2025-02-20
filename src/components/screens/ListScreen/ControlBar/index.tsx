import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import * as wanakana from "wanakana";

import { cn } from "@/lib/utils";
import SortAndFilterSettings from "./SortAndFilterSettings/SortAndFilterSettings";
import CardPresentationSettings from "./CardPresentationSettings/CardPresentationSettings";

const SearchInput = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>();
  const [value, setValue] = useState("keyword");

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
        console.log("cannot unbind initial");
      }
      return;
    }

    if (value === "onyomi") {
      const newValue = wanakana.toKatakana(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.log("cannot unbind to onyomi");
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
        console.log("cannot unbind to kunyomi");
      }
      inputRef.current.value = newValue;
      wanakana.bind(inputRef.current, { IMEMode: "toHiragana" });
      return;
    }
  }, [value]);

  const placeHolder =
    value === "keyword"
      ? "Keyword Search"
      : value === "onyomi"
      ? "オニョミ 検索"
      : "くにょみ 検索";

  const fontCN = value !== "keyword" ? "kanji-font" : "";
  const itemCNFunc = (v: string) => (v !== "keyword" ? "kanji-font" : "");
  return (
    <section className="w-full relative">
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          `pl-7 pr-32 h-9 ${fontCN}`
        )}
        placeholder={placeHolder}
        ref={inputRef}
      />
      <Search className="pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50" />
      <BasicSelect
        value={value}
        onChange={(newValue) => setValue(newValue)}
        triggerCN={`absolute right-1 top-1 w-28 h-7 bg-gray-100 dark:bg-gray-900 ${fontCN}`}
        selectItemCNFunc={itemCNFunc}
        options={[
          { value: "keyword", label: "Keyword" },
          { value: "onyomi", label: "オニョミ" },
          { value: "kunyomi", label: "くにょみ" },
        ]}
        srOnlyLabel="Search Type"
      />
    </section>
  );
};

const ControlBar = () => {
  return (
    <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
      <SearchInput />
      <SortAndFilterSettings />
      <CardPresentationSettings />
    </section>
  );
};

export default ControlBar;
