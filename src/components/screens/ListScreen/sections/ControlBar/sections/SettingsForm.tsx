import { ReactNode, useId, useState } from "react";

import BasicSelect from "../../../../../common/BasicSelect";
import { Badge } from "@/components/ui/badge";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";

import { ArrowDownWideNarrow, FilterX } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";

const JLPTOptions = [
  { value: "n1", label: "N1" },
  { value: "n2", label: "N2" },
  { value: "n3", label: "N3" },
  { value: "n4", label: "N4" },
  { value: "n5", label: "N5" },
];

function JLPTSelector() {
  const [selectedJLPT, setSelectedJLPT] = useState<string[]>([
    "n1",
    "n2",
    "n3",
    "n4",
    "n5",
  ]);
  const id = useId();
  const fieldId = `multiselectframework-${id}`;

  return (
    <div className="max-w-xl">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        JLPT
      </Label>
      <MultiSelect
        name={fieldId}
        options={JLPTOptions}
        onValueChange={setSelectedJLPT}
        defaultValue={selectedJLPT}
        placeholder="All JLPT levels are selected by default"
        variant="inverted"
        maxCount={3}
      />
    </div>
  );
}

const K_JLPT = "jlpt";
const K_ONYOMI = "onyomi";
const K_KUNYOMI = "kunyomi";
const K_STROKES = "strokes";
const K_WK_LVL = "wanikani_level";

const K_RTK_INDEX = "rtk_index";
const K_MEANING_KEY = "meaning_key";

const K_RANK_NETLIX = "freq-rank-netflix";
const K_RANK_DRAMA_SUBTITLES = "freq-rank-drama-subtitles";
const K_RANK_NOVELS_5100 = "freq-rank-novels-5100";
const K_RANK_TWITTER = "freq-rank-twitter";
const K_RANK_WIKIPEDIA_DOC = "freq-rank-wikipedia-doc";
const K_RANK_WIKIPEDIA_CHAR = "freq-rank-wikipedia-char";
const K_RANK_ONLINE_NEWS_DOC = "freq-rank-online-news-doc";
const K_RANK_ONLINE_NEWS_CHAR = "freq-rank-online-news-char";
const K_RANK_AOZORA_DOC = "freq-rank-aozora-doc";
const K_RANK_AOZORA_CHAR = "freq-rank-aozora-char";
const K_RANK_NEWSPAPER_1 = "freq-rank-newspaper-1";
const K_RANK_NEWSPAPER_2 = "freq-rank-newspaper-2";

const GROUP_OPTIONS = [K_JLPT, K_KUNYOMI, K_ONYOMI, K_STROKES, K_WK_LVL];
const NONGROUP_OPTIONS = [K_RTK_INDEX, K_MEANING_KEY];
const FREQ_RANK_OPTIONS = [
  K_RANK_NETLIX,
  K_RANK_DRAMA_SUBTITLES,
  K_RANK_NOVELS_5100,
  K_RANK_TWITTER,
  K_RANK_WIKIPEDIA_DOC,
  K_RANK_WIKIPEDIA_CHAR,
  K_RANK_ONLINE_NEWS_DOC,
  K_RANK_ONLINE_NEWS_CHAR,
  K_RANK_AOZORA_DOC,
  K_RANK_AOZORA_CHAR,
  K_RANK_NEWSPAPER_1,
  K_RANK_NEWSPAPER_2,
];

const OPTION_LABELS: Record<string, string> = {
  [K_JLPT]: "JLPT",
  [K_KUNYOMI]: "Kunyomi",
  [K_ONYOMI]: "Onyomi",
  [K_STROKES]: "Strokes",
  [K_WK_LVL]: "Wanikani Level",
  [K_RTK_INDEX]: "RTK Index",
  [K_MEANING_KEY]: "Meaning Key",
  [K_RANK_NETLIX]: "Netflix Frequency Rank",
  [K_RANK_DRAMA_SUBTITLES]: "Drama Subtitles Corpus Frequency Rank",
  [K_RANK_NOVELS_5100]: "5100 Novels Corpus Frequency Rank",
  [K_RANK_TWITTER]: "Twitter Corpus Frequency Rank",
  [K_RANK_WIKIPEDIA_DOC]: "Wikipedia Doc Frequency Rank",
  [K_RANK_WIKIPEDIA_CHAR]: "Wikipedia Char Frequency Rank",
  [K_RANK_ONLINE_NEWS_DOC]: "Online News Doc Frequency Rank",
  [K_RANK_ONLINE_NEWS_CHAR]: "Online News Doc Frequency Rank ",
  [K_RANK_AOZORA_DOC]: "Aozora Doc Frequency Rank",
  [K_RANK_AOZORA_CHAR]: "Aozora Docs Frequency Rank",
  [K_RANK_NEWSPAPER_1]: "Newspaper Frequency Rank 1",
  [K_RANK_NEWSPAPER_2]: "Newspaper Frequency Rank 2",
};

const FREQUENCY_RANK_FILTER_OPTIONS: { value: string; label: string }[] =
  FREQ_RANK_OPTIONS.map((optionValue) => {
    return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
  });

const PRIMARY_SORT_ORDER_SELECT: { value: string; label: string }[] = [
  ...GROUP_OPTIONS,
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
});

const SECONDARY_SORT_ORDER_SELECT: { value: string; label: string }[] = [
  ...NONGROUP_OPTIONS,
  ...FREQ_RANK_OPTIONS,
].map((optionValue) => {
  return { value: optionValue, label: OPTION_LABELS[optionValue] ?? "-" };
});

const UppercaseHeading = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => {
  return (
    <h1 className="mb-3 text-md font-bold flex items-center border-b w-full border-dotted ">
      {icon} <span className="pl-1">{title}</span>
    </h1>
  );
};

export function FrequencyRankFilterDataSourceSelect() {
  const [value, setValue] = useState(FREQUENCY_RANK_FILTER_OPTIONS[0].value);

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={"h-8 w-full"}
      options={FREQUENCY_RANK_FILTER_OPTIONS}
      srOnlyLabel="Frequency Data Source"
    />
  );
}

const SortOrderSection = () => {
  const [value, setValue] = useState(PRIMARY_SORT_ORDER_SELECT[0].value);
  const [secondValue, setSecondValue] = useState(
    SECONDARY_SORT_ORDER_SELECT[0].value
  );

  return (
    <section className="flex items-start flex-col mt-2 w-full">
      <UppercaseHeading
        title="Sort Order ***"
        icon={<ArrowDownWideNarrow size={15} />}
      />
      <section className="flex flex-col space-y-1 md:space-y-0  md:flex-row md:space-x-1 mt-2 w-full">
        <div className="text-left  md:w-1/2">
          <div className="text-xs">Primary</div>
          <BasicSelect
            value={value}
            onChange={(newValue) => setValue(newValue)}
            triggerCN={"h-8 w-full"}
            options={PRIMARY_SORT_ORDER_SELECT}
            srOnlyLabel="Primary"
          />
        </div>
        <div className="text-left md:w-1/2">
          <div className="text-xs">Secondary</div>
          <BasicSelect
            value={secondValue}
            onChange={(newValue) => setSecondValue(newValue)}
            triggerCN={"h-8 w-full"}
            options={SECONDARY_SORT_ORDER_SELECT}
            srOnlyLabel="Primary"
          />
        </div>
      </section>
      <div className="text-xs flex mt-3 flex-wrap space-y-1 items-center justify-center">
        <div>***</div>
        <div className="mx-2">Order By</div>
        <Badge>{OPTION_LABELS[value]} </Badge>
        <div className="mx-2">Then By</div>
        <Badge>{OPTION_LABELS[secondValue]} </Badge>
      </div>
    </section>
  );
};

const FrequencyRankingRangeField = () => {
  const [values, setValues] = useState([0, 1000]);
  const id = useId();
  const fieldId = `strokecountfilter-${id}`;

  return (
    <div className="w-full">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        Frequency Ranking
      </Label>
      <DualRangeSlider
        id={fieldId}
        label={(value) => value}
        labelPosition="bottom"
        className="text-xs pt-2"
        value={values}
        onValueChange={setValues}
        min={0}
        max={2500}
        step={50}
      />
    </div>
  );
};

const StrokeCountField = () => {
  const [values, setValues] = useState([1, 250]);
  const id = useId();
  const fieldId = `strokecountfilter-${id}`;

  return (
    <div className="w-full">
      <Label className="text-xs font-thin" htmlFor={fieldId}>
        Stroke Count
      </Label>
      <DualRangeSlider
        id={fieldId}
        label={(value) => value}
        labelPosition="bottom"
        className="text-xs pt-2"
        value={values}
        onValueChange={setValues}
        min={1}
        max={250}
        step={1}
      />
    </div>
  );
};

const FilterSection = () => {
  return (
    <section className="text-start w-full">
      <UppercaseHeading title="Filters" icon={<FilterX size={15} />} />

      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2 pb-8">
          <StrokeCountField />
        </div>
        <div className="w-full md:w-1/2">
          <JLPTSelector />
        </div>
      </div>
      <div className="py-2 mt-4 md:mt-0 uppercase text-xs">
        Frequency Ranking
      </div>
      <div className="flex w-full flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="text-left w-full pb-4 md:pb-0">
            <div className="text-xs">Data Source</div>
            <FrequencyRankFilterDataSourceSelect />
          </div>
        </div>

        <div className="w-full md:w-1/2 pb-8">
          <FrequencyRankingRangeField />
        </div>
      </div>
    </section>
  );
};

const SettingsForm = () => {
  return (
    <section className="flex flex-col items-start justify-start w-full">
      <form className="w-full flex flex-col space-y-4">
        <SortOrderSection />
        <FilterSection />
        <div className="flex w-full justify-end">
          A total of<span className="font-extrabold mx-1">146</span> Kanji
          Characters match your filters
        </div>
        <div className="flex justify-end space-x-1 border-t pt-3">
          <Button variant={"secondary"}>Reset</Button>
          <Button>Apply</Button>
        </div>
      </form>
    </section>
  );
};

export default SettingsForm;
