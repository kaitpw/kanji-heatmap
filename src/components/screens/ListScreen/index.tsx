import { Settings } from "lucide-react";
import ControlBar from "./ControlBar";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import SettingsForm from "./SettingsForm";
import kanjiJson from "@/db/kanji.json";
import HoverMe, { DrawerDemo } from "@/components/common/HoverMe";
import { useMemo, useState } from "react";
import React from "react";
import { useSearchParams } from "wouter";

const SettingsAccordion = () => {
  return (
    <SimpleAccordion
      trigger={
        <>
          <Settings size={15} />
          <span className="px-1">Settings</span>
        </>
      }
      content={<SettingsForm />}
    />
  );
};

const keys = Object.keys(kanjiJson);

/*
const GroupsScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const helloParam = searchParams.get("hello");
  const fooParam = searchParams.get("foo");
  const noExistParam = searchParams.get("noExist");

  return (
    <div>
      Groups Screen
      <p>Hello: {helloParam ?? "none"}</p>
      <p>Foo Param: {fooParam ?? "none"}</p>
      <p>No Exist: {noExistParam ?? "none"}</p>
      <Button
        onClick={() => {
          const randomInt = () => Math.round(Math.random() * 1000);
          const partial = {
            hello: `hello-${randomInt()}`,
            foo: `foo-${randomInt()}`,
          };
          setSearchParams(
            Math.random() > 0.5
              ? partial
              : { ...partial, noExist: `existing-actually-${randomInt()}` }
          );
        }}
      >
        Click Me
      </Button>
    </div>
  );
};



*/
const ListScreenRaw = () => {
  const [hoveredKanji, setHoveredKanji] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const setOpenedKanji = useMemo(
    () => (kanji: string | null) => {
      setSearchParams(kanji == null ? {} : { openedKanji: kanji });
    },
    [setSearchParams]
  );

  const openedKanji = searchParams.get("openedKanji");
  return (
    <div className="w-full text-sm p-2 mx-auto">
      <ControlBar />
      <section className="mx-auto max-w-screen-xl my-1 rounded-sm">
        <SettingsAccordion />
      </section>
      <div className="flex flex-wrap mt-4">
        {keys.map((key) => {
          return (
            <HoverMe
              key={key}
              trigger={key}
              isOpen={hoveredKanji === key}
              setOpen={setHoveredKanji}
              openDrawer={setOpenedKanji}
            />
          );
        })}
      </div>
      <DrawerDemo
        isOpen={openedKanji !== null}
        onClose={() => {
          setSearchParams({});
        }}
        kanji={openedKanji}
      />
    </div>
  );
};

const ListScreen = React.memo(ListScreenRaw);

export default ListScreen;
