import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export const KanjiLink = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <Link
      to={`/?openedKanji=${kanji}`}
      className={
        "flex flex-col m-1 p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
      }
    >
      <Badge>{keyword}</Badge>
      <div className="kanji-font">{kanji}</div>
    </Link>
  );
};
