import { useState } from "react";

import SortAndFilterSettings from "./SortAndFilterSettings/SortAndFilterSettings";
import CardPresentationSettings, {
  CardPresentationSettingsContent,
} from "./CardPresentationSettings";
import { SearchInput } from "./SearchInput";
import {
  K_JLPT,
  K_RANK_DRAMA_SUBTITLES,
  K_RTK_INDEX,
} from "@/lib/frequency-rank";
import { JLTPTtypes } from "@/lib/constants";

export type SortSettings = { primary: string; secondary?: string };
export type FilterSettings = {
  strokeRange: { min: number; max: number };
  jlpt: JLTPTtypes[];
  freq: { source: string; rankRange: { min: number; max: number } };
};

export type CardSettings = {
  cardType: "expanded" | "compact";
  borderMeaning?: "jlpt" | null;
  backgroundMeaning?: "string" | null;
};

export type SearchSettings = {
  text: string;
  type: "Keyword" | "Onyomi" | "Kunyomi" | string; // TODO: Fix this later
};

const ControlBar = () => {
  // TODO: Put better types, and better name

  // put all these states in local storage
  const [itemListSettings, setItemListSettings] = useState<{
    searchSettings: SearchSettings;
    sortSettings: SortSettings;
    filterSettings: FilterSettings;
  }>({
    searchSettings: { text: "", type: "Keyword" as const },
    sortSettings: { primary: K_JLPT, secondary: K_RTK_INDEX },
    filterSettings: {
      strokeRange: { min: 1, max: 100 },
      jlpt: [],
      freq: { source: K_RANK_DRAMA_SUBTITLES, rankRange: { min: 1, max: 500 } },
    },
  });

  //  const [itemSettings, setItemSettings] = useState({
  //    cardType: "expanded",
  //    borderMeaning: "jlpt",
  //    backgroundMeaning: K_RANK_DRAMA_SUBTITLES,
  //  });

  const itemCount = 143;

  return (
    <section className="mx-auto max-w-screen-xl flex border-0 space-x-1 sticky">
      <SearchInput
        onSettle={(text, searchType) => {
          console.log(
            "finished debouncing",
            text,
            searchType,
            "old values",
            itemListSettings
          );
          setItemListSettings((prev) => {
            return { ...prev, searchSettings: { text, type: searchType } };
          });
        }}
      />
      <div className="px-2 rounded-lg bg-opacity-75 bg-white dark:bg-black border absolute top-[39px] text-xs font-extrabold">
        {itemCount} items
      </div>
      <SortAndFilterSettings />
      <CardPresentationSettings>
        <CardPresentationSettingsContent />
      </CardPresentationSettings>
    </section>
  );
};

export default ControlBar;
