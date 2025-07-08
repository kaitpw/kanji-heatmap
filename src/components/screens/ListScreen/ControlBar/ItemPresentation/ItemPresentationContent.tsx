import type { ReactNode } from "react";
import type { FrequencyType } from "@/lib/options/options-types";
import {
  useItemSettings,
  useItemSettingsDispatch,
} from "@/providers/item-settings-hooks";

import { DottedSeparator } from "@/components/ui/dotted-separator";

import { FrequencyRankDataSource } from "@/components/common/freq/FrequencyRankDataSource";
import { FreqGradient } from "@/components/common/freq/FreqGradient";
import { ItemTypeSwitch } from "@/components/common/ItemTypeSwitch";
import { JLPTBordersMeanings } from "@/components/common/jlpt/JLPTBorderMeanings";
import { FreqGradientInfoIcon } from "@/components/common/freq/FreqGradientInfoIcon";
import {
  useBgSrc,
  useBgSrcDispatch,
} from "@/components/dependent/routing/routing-hooks";

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-4 mb-2">{children}</h2>
);

const BackgroundColorSection = () => {
  const initialState = useBgSrc();
  const dispatch = useBgSrcDispatch();

  return (
    <>
      <H2>
        Background Color Meaning <FreqGradientInfoIcon />
      </H2>
      <>
        <FreqGradient />
        <FrequencyRankDataSource
          value={initialState}
          setValue={(v) => {
            dispatch(v as FrequencyType);
          }}
        />
      </>
    </>
  );
};

const CardStateSettings = () => {
  const cardState = useItemSettings();
  const dispatch = useItemSettingsDispatch();

  return (
    <>
      <H2>Design</H2>
      <ItemTypeSwitch
        value={cardState.cardType !== "compact"}
        setValue={(v) => {
          dispatch("cardType", v === false ? "compact" : "expanded");
        }}
      />
      <H2>Border Color Meaning</H2>
      <JLPTBordersMeanings />
    </>
  );
};

export const ItemPresentationSettingsContent = () => {
  return (
    <article className="text-left">
      <h1 className="text-lg font-bold flex space-x-2 items-center mb-0 pb-0">
        Item Presentation Settings
      </h1>
      <DottedSeparator className="p-0 m-0" />
      <CardStateSettings />
      <BackgroundColorSection />
    </article>
  );
};
