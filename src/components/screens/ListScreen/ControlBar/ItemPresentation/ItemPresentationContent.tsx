import { Separator } from "@/components/ui/separator";
import { ReactNode, useState } from "react";
import { JLPTBordersMeanings } from "./jlpt";
import { BackgroundColorGradient } from "./freq";
import {
  useItemSettings,
  useItemSettingsDispatch,
} from "@/providers/item-settings-provider";
import { ItemTypeSwitch } from "./ItemTypeSwitch";
import { LabeledCheckbox } from "@/components/common/LabeledCheckbox";
import { FrequencyRankDataSource } from "@/components/common/FrequencyRankDataSource";
import { FrequencyType } from "@/lib/sort-freq-types";

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold border-b-2 border-dotted mt-6 mb-2">{children}</h2>
);

export const ItemPresentationSettingsContent = () => {
  const cardState = useItemSettings();
  const dispatch = useItemSettingsDispatch();
  const [shouldAttachMeaning, setShouldAttachMeaning] = useState(
    cardState.backgroundColorSettingDataSource !== "none"
  );

  return (
    <article className="text-left">
      <h1 className="text-lg font-bold flex space-x-2 items-center">
        Item Presentation Settings
      </h1>
      <Separator className="mb-2" />
      <section>
        <H2>Button Type</H2>
        <ItemTypeSwitch
          value={cardState.cardType !== "compact"}
          setValue={(v) => {
            dispatch("cardType", v === false ? "compact" : "expanded");
          }}
        />
      </section>
      <section>
        <H2>Border Color Meaning</H2>
        <LabeledCheckbox
          label="Attach Border Color Meaning (JLPT)"
          value={cardState.borderColorAttached}
          onChange={(v) => {
            dispatch("borderColorAttached", v);
          }}
        />
        {cardState.borderColorAttached && <JLPTBordersMeanings />}
      </section>
      <section>
        <H2>Background Color Meaning</H2>
        <LabeledCheckbox
          label="Attach Background Color Meaning"
          value={shouldAttachMeaning}
          onChange={(v) => {
            if (v === false) {
              dispatch("backgroundColorSettingDataSource", "none");
            }
            setShouldAttachMeaning(v);
          }}
        />
        {shouldAttachMeaning && (
          <>
            <BackgroundColorGradient />
            <FrequencyRankDataSource
              value={cardState.backgroundColorSettingDataSource}
              setValue={(v) => {
                dispatch(
                  "backgroundColorSettingDataSource",
                  v as FrequencyType
                );
              }}
            />
          </>
        )}
      </section>
    </article>
  );
};
