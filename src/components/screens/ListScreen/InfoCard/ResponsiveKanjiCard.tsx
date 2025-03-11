import { KanjiCard } from "./KanjiCard";
import { SmallKanjiCard } from "./SmallCard";

export const ResponsiveKanjiCard = ({ kanji }: { kanji: string }) => {
  return (
    <>
      <div className="hidden [@media(min-height:900px)]:[@media(min-width:400px)]:block w-96">
        <KanjiCard kanji={kanji} />
      </div>
      <div className="w-52 flex items-center justify-center [@media(min-height:900px)]:[@media(min-width:400px)]:hidden">
        <SmallKanjiCard kanji={kanji} />
      </div>
    </>
  );
};
