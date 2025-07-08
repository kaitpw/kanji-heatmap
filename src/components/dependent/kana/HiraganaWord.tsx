import { Badge } from "@/components/ui/badge";
import { useSpeak } from "@/hooks/use-jp-speak";

export const HiraganaWord = ({
  rawKana,
  highlightIndex,
}: {
  rawKana: string;
  highlightIndex: number;
}) => {
  const kana = rawKana.split(",")[0];
  const { speak } = useSpeak(rawKana);

  return (
    <Badge
      variant={"ja_outline"}
      className={
        "flex gap-2 m-1 cursor-pointer text-lg kanji-font hover:bg-[#2effff] hover:text-black"
      }
      onClick={() => speak()}
    >
      {kana.split(" ").map((mora, index) => {
        const key = `${mora}-${index}`;

        if (index === highlightIndex) {
          return (
            <div className={"text-[15px] md:text-[20px] relative"} key={key}>
              {mora}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-current"></div>
            </div>
          );
        }

        return (
          <span className={"text-[15px] md:text-[20px]"} key={key}>
            {mora}
          </span>
        );
      })}
    </Badge>
  );
};
