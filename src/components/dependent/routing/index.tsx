import { Link, Route, Switch, useSearchParams } from "wouter";
import { cnTextLink } from "@/lib/generic-cn";
import { Badge } from "@/components/ui/badge";
import {
  useClearedUrl,
  useKanjiFromUrl,
  useRandomKanjiLinkExcept,
} from "./routing-hooks";
import { Dices } from "lucide-react";

export const GlobalHomeLink = () => {
  return (
    <Link to={"/"} className={cnTextLink}>
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
  return <Link to={"/"}>Kanji Heatmap</Link>;
};

export const ClearFiltersCTA = () => {
  const [searchParams] = useSearchParams();

  const link = useClearedUrl();

  const noChange = searchParams.toString() === link;

  if (noChange) {
    return <>{"Small typo, maybe?"}</>;
  }

  return (
    <>
      Try
      <Link to={`/?${link}`} className={cnTextLink}>
        clearing your filters
      </Link>
      to see more results.
    </>
  );
};

const btnLinkCn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8";

export const RandomKanjiLink = ({ exceptKanji }: { exceptKanji: string }) => {
  const link = useRandomKanjiLinkExcept(exceptKanji);
  return (
    <>
      {" "}
      {link && (
        <Link className={btnLinkCn} to={`?${link}`}>
          <Dices />
        </Link>
      )}
    </>
  );
};

export { Route, Switch, Link };
