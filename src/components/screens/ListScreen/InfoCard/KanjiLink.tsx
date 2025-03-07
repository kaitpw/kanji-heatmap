import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { URL_PARAMS } from "@/lib/constants";

export const KanjiLink = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  return (
    <Link
      to={`/?${URL_PARAMS.openKanji}=${kanji}`}
      className={
        "flex flex-col m-1 p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
      }
    >
      <Badge>{keyword}</Badge>
      <div className="kanji-font">{kanji}</div>
    </Link>
  );
};
