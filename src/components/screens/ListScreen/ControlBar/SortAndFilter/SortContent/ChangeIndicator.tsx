import { useSearchSettings } from "@/providers/search-settings-provider";
import { shouldShowAllKanji } from "./helpers";

export const ChangedIndicator = () => {
  const settings = useSearchSettings();
  const noMark = shouldShowAllKanji(settings);

  if (noMark) {
    return <></>;
  }
  return (
    <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
  );
};
