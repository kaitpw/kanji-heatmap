import { useCallback } from "react";
import { useKanjiUrlState } from "@/components/dependent/routing/routing-hooks";
import { KanjiDrawer } from "../Drawer";

export const KanjiDrawerGlobal = () => {
  const [openedKanji, setOpenedKanji] = useKanjiUrlState();

  const onDrawerClose = useCallback(() => {
    setOpenedKanji(null);
  }, [setOpenedKanji]);
  return (
    <>
      <KanjiDrawer
        isOpen={openedKanji !== null}
        onClose={onDrawerClose}
        kanji={openedKanji ?? ""}
      />
    </>
  );
};
