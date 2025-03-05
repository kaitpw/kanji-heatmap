import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Flower } from "lucide-react";
import { useState, ReactNode } from "react";
import { FrequencyRankDataSource } from "../SortAndFilterSettings/sections/common";
import {
  BackgroundColorGradient,
  CardTypeSwitch,
  H2,
  JLPTBordersMeanings,
  LabeledCheckbox,
} from "./common";
import {
  useCardSettings,
  useCardSettingsDispatch,
} from "@/providers/card-settings-provider";
import { FrequencyType } from "@/lib/frequency-rank";

export const CardPresentationSettingsContent = () => {
  const cardState = useCardSettings();
  const dispatch = useCardSettingsDispatch();
  const [shouldAttachMeaning, setShouldAttachMeaning] = useState(
    cardState.backgroundColorSettingDataSource !== "None"
  );
  return (
    <article className="text-left">
      <h1 className="text-lg font-bold flex space-x-2 items-center">
        Item Presentation Settings
      </h1>
      <Separator className="mb-2" />
      <section>
        <H2>Card Type</H2>
        <CardTypeSwitch
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
              dispatch("backgroundColorSettingDataSource", "None");
            }
            setShouldAttachMeaning(v);
          }}
        />
        {shouldAttachMeaning && (
          <>
            <BackgroundColorGradient />
            <p className="text-xs mt-3">Frequency Data Source*</p>
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

const CardPresentationSettings = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={(newState) => {
        setIsOpen(newState);
      }}
    >
      <PopoverTrigger
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        asChild
      >
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Flower />
          <span className="sr-only">Card Presentation Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-4 -translate-y-1 max-h-[80svh] overflow-y-auto overflow-x-hidden">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CardPresentationSettings;
