import { Search } from "lucide-react";
import { Input } from "../../../../ui/input";
import { useEffect, useRef, useState } from "react";
import BasicSelect from "@/components/common/BasicSelect";
import * as wanakana from "wanakana";

import SortAndFilterSettings from "./sections/SortAndFilterSettings";
import CardPresentationSettings from "./sections/CardPresentationSettings";

const SearchInput = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>();
  const [value, setValue] = useState("meaning");

  useEffect(() => {
    console.log("text", inputRef?.current?.value);
    const currentValue = inputRef?.current?.value ?? "";

    if (inputRef.current?.value == null) {
      return;
    }

    if (value === "meaning") {
      inputRef.current.value = wanakana.toRomaji(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.log("cannot unbind");
      }
      return;
    }

    if (value === "onyomi") {
      const newValue = wanakana.toKatakana(currentValue);
      try {
        wanakana.unbind(inputRef.current);
      } catch {
        console.log("cannot unbind");
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
        console.log("cannot unbind");
      }
      inputRef.current.value = newValue;
      wanakana.bind(inputRef.current, { IMEMode: "toHiragana" });
      return;
    }
  }, [value]);

  const placeHolder =
    value === "meaning"
      ? "Search by Meaning"
      : value === "onyomi"
      ? "オニョミ"
      : "くにょみ";
  return (
    <section className="w-full relative">
      <Input
        className={`pl-7 pr-32 h-9 ${value === "meaning" ? "" : "kanji-font"}`}
        placeholder={placeHolder}
        ref={inputRef}
      />
      <Search className="pointer-events-none absolute left-2 top-2 size-4 translate-y-0.5 select-none opacity-50" />
      <BasicSelect
        value={value}
        onChange={(newValue) => setValue(newValue)}
        triggerCN={
          "absolute right-1 top-1 w-28 h-7 bg-gray-100 dark:bg-gray-900"
        }
        options={[
          { value: "meaning", label: "Meaning" },
          { value: "onyomi", label: "Onyomi" },
          { value: "kunyomi", label: "Kunyomi" },
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
