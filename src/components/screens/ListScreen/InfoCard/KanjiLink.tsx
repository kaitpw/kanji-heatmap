import { Link, useSearchParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { URL_PARAMS } from "@/lib/constants";
import { useState } from "react";

export const KanjiLink = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  const [params] = useSearchParams();
  const [urlState] = useState(() => {
    // TODO. Is there a better way that doesn't use useState and useSearchParams?
    params.delete(URL_PARAMS.openKanji);
    params.set(URL_PARAMS.openKanji, kanji);
    return params.toString();
  });
  return (
    <Link
      to={`/?${urlState}`}
      className={
        "flex flex-col m-1 p-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
      }
    >
      <Badge className="text-center justify-center">{keyword}</Badge>
      <div className="kanji-font">{kanji}</div>
    </Link>
  );
};
