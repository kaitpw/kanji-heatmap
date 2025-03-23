import { Link, Route, Switch, useSearchParams } from "wouter";
import { URL_PARAMS } from "@/lib/settings/url-params";
import { cnTextLink } from "@/lib/generic-cn";
import { Badge } from "@/components/ui/badge";
import { useKanjiFromUrl } from "./routing-hooks";

export const GlobalHomeLink = () => {
  return (
    <Link to="/" className={cnTextLink}>
      home.
    </Link>
  );
};

export const GlobalKanjiLink = ({
  kanji,
  keyword,
}: {
  kanji: string;
  keyword: string;
}) => {
  const urlState = useKanjiFromUrl(kanji);
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

export const GlobalHomeHeaderLink = () => {
  return <Link to="/">Kanji Heatmap</Link>;
};

export const ClearFiltersCTA = () => {
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get(URL_PARAMS.textSearch.text);
  const searchType = searchParams.get(URL_PARAMS.textSearch.type);

  const hasText = (searchText ?? "").length > 0;
  const hasType = (searchType ?? "").length > 0;
  const textString = hasText
    ? `${URL_PARAMS.textSearch.text}=${searchText}`
    : "";

  const typeString = hasType
    ? `&${URL_PARAMS.textSearch.type}=${searchType}`
    : "";

  const link = `${textString}${typeString}`;

  const noChange = searchParams.toString() === link;

  if (noChange) {
    return <>{"Small typo, maybe?"}</>;
  }

  return (
    <>
      Try
      <Link to={`/?${textString}${typeString}`} className={cnTextLink}>
        clearing your filters
      </Link>
      to see more results.
    </>
  );
};

export { Route, Switch, Link };
