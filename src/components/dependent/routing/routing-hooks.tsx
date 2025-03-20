import { useLocation, useSearchParams } from "wouter";
import { useCallback, useMemo } from "react";
import { URL_PARAMS } from "@/lib/constants";

export const useKanjiUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useCallback(
    (kanji: string | null) => {
      setSearchParams((prev) => {
        if (kanji == null) {
          prev.delete(URL_PARAMS.openKanji);
          return prev;
        }

        prev.set(URL_PARAMS.openKanji, kanji);
        return prev;
      });
    },
    [setSearchParams]
  );
  const openedKanji = searchParams.get(URL_PARAMS.openKanji);

  return [openedKanji, setOpenedKanji] as [
    string,
    (kanji: string | null) => void,
  ];
};

export const useKanjiFromUrl = (kanji: string) => {
  const [params] = useSearchParams();

  const urlState = useMemo(() => {
    // TODO. Is there a better way that doesn't use useState and useSearchParams?
    params.delete(URL_PARAMS.openKanji);
    params.set(URL_PARAMS.openKanji, kanji);
    return params.toString();
  }, [kanji, params]);

  return urlState;
};

export const useUrlLocation = () => {
  const [location] = useLocation();
  return location;
};

export { useSearchParams };
