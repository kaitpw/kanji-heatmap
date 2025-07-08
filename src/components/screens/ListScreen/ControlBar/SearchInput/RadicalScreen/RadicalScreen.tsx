/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ReactNode } from "react";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import {
  useGetKanjiInfoFn,
  useKanjiSearchResult,
} from "@/kanji-worker/kanji-worker-hooks";
import { KANJI_COUNT } from "@/lib/options/constants";
import {
  moreRadicalKeywords,
  radicalsGroupedByStrokeCount,
} from "@/lib/radicals";
import { CircleX } from "@/components/icons";
import { KanjiItemSimpleButton } from "@/components/sections/KanjiHoverItem/KanjiItemButton";
import { ClearFiltersCTA } from "@/components/dependent/routing/ClearFiltersCTA";
import { externalLinks } from "@/lib/external-links";
import { ExternalTextLink } from "@/components/common/ExternalTextLink";
import { SmallUnexpectedErrorFallback } from "@/components/error/SmallUnexpectedErrorFallback";

const StrokeDivider = ({ stroke }: { stroke: string }) => {
  return (
    <div
      className={`
        w-[47px] h-[45px]
        ml-1 mb-1 kanji-font text-xl rounded-md
        flex justify-center items-center
        text-theme-color-with-opacity-100
        border-theme-color-with-opacity-40
        border
      `}
    >
      {stroke}
    </div>
  );
};

const RadicalBtn = ({
  isDisabled,
  onClick,
  isTouchDevice,
  isSelected,
  radical,
}: {
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSelected: boolean;
  radical: string;
  isTouchDevice: boolean;
}) => {
  const cn1 = isDisabled
    ? "opacity-10"
    : isTouchDevice
    ? ""
    : "hover:bg-[#2effff] hover:text-black hover:border-4 hover:border-solid hover:border-[#2effff] rounded-sm";

  const cn2 = isSelected
    ? "rounded-xl bg-black text-white dark:bg-white dark:text-black"
    : "border border-dotted border-current rounded-sm";
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`
        w-[47px] h-[45px] transition-all duration-500 ml-1 mb-1 kanji-font text-2xl
        disabled:cursor-not-allowed disabled:border-dotted
        ${cn1}
        ${cn2} 
      `}
    >
      {radical}
    </button>
  );
};

const ExpandedRadicalBtn = ({
  onClick,
  radical,
  radicalKeyword,
}: {
  radical: string;
  radicalKeyword: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`
        relative
        grow min-w-[85px] h-full ml-1 -mt-1 mb-0 py-0
        flex flex-col justify-center items-center shrink-0 
        rounded-xl  
        bg-black text-white dark:bg-white dark:text-black
            `}
    >
      <button onClick={onClick}>
        <CircleX className="absolute top-1 right-1 scale-75 hover:text-red-500" />
        <span className="sr-only">Close</span>
      </button>
      <span className="block text-4xl kanji-font mb-1">{radical}</span>
      <span className="
          block !text-ellipsis !text-nowrap mx-4 !overflow-hidden !whitespace-nowrap 
          text-xs font-bold px-2 rounded-full
          dark:bg-black dark:text-white bg-white text-black">
        {radicalKeyword}
      </span>
    </div>
  );
};

const TitleLayout = ({ children }: { children: ReactNode }) => {
  return (
    <span className="
        font-bold px-1 rounded-full text-sm
        dark:bg-black dark:text-white bg-white text-black
      ">
      {children}
    </span>
  );
};

export const ResultPreviewTitle = () => {
  const { data } = useKanjiSearchResult();
  const count = (data ?? []).length;

  return (
    <TitleLayout>Results Preview {count > 0 ? `(${count})` : ""}</TitleLayout>
  );
};

export const SelectRadicalTitle = ({ count }: { count: number }) => {
  if (count <= 0) {
    return <TitleLayout>Select Radicals</TitleLayout>;
  }
  return <TitleLayout>Radicals Selected {`(${count})`}</TitleLayout>;
};

export const RadicalScreenLayout = ({
  top,
  middle,
  bottom,
  count,
}: {
  top: ReactNode;
  middle: ReactNode;
  bottom: ReactNode;
  count: number;
}) => {
  if (count === 0) {
    return (
      <div className="mx-auto w-full px-1 relative">
        <div className="absolute -top-1 w-full m-auto z-50">
          <SelectRadicalTitle count={count} />
        </div>
        <div
          className="w-full px-2 mt-2 py-3 border-2 border-dotted dark:border-slate-600 overflow-y-auto flex flex-wrap justify-center items-start rounded-md relative"
          style={{ maxHeight: "calc(100dvh - 30px)" }}
        >
          {top}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-1 relative">
      <div className="absolute -top-1 w-full m-auto z-50">
        <SelectRadicalTitle count={count} />
      </div>

      <div
        className="w-full px-2 mt-2 py-3 border-2 border-dotted dark:border-slate-600 overflow-y-auto flex flex-wrap justify-center items-start rounded-md relative"
        style={{ maxHeight: "calc(100dvh - 280px)" }}
      >
        {top}
      </div>
      <div className="w-full h-24 mt-1 pt-1 mb-1 pb-0 overflow-x-auto overflow-y-hidden flex rounded-md scrollbar-thin relative transition-all animate-fade-in">
        {middle}
      </div>

      <div className="border-2 border-dotted dark:border-slate-600 pt-3 mt-2 w-full h-36 my-1 py-1 overflow-x-auto overflow-y-hidden flex rounded-md scrollbar-thin z-50 animate-fade-in">
        {bottom}
      </div>
      <div className="absolute bottom-[136px] w-full m-auto z-50">
        <ResultPreviewTitle />
      </div>
    </div>
  );
};

export const RadicalScreenContent = ({
  value,
  setValue,
}: {
  value: Set<string>;
  setValue: (_: Set<string>) => void;
}) => {
  const { additionalData: possibleRadicals } = useKanjiSearchResult();
  const isTouchDevice = useIsTouchDevice();

  const getBasicInfo = useGetKanjiInfoFn();

  if (getBasicInfo == null) {
    return null;
  }

  return (
    <>
      {Object.keys(radicalsGroupedByStrokeCount).map((stroke) => {
        const keyValue = stroke as keyof typeof radicalsGroupedByStrokeCount;
        return (
          <React.Fragment key={stroke}>
            {radicalsGroupedByStrokeCount[keyValue].map((radical, index) => {
              const isSelected = value.has(radical);
              const isDisabled = possibleRadicals == null
                ? false
                : (possibleRadicals as Set<string>).has(radical) || isSelected
                ? false
                : true;

              return (
                <React.Fragment key={radical}>
                  {index === 0 && <StrokeDivider stroke={stroke} />}
                  <RadicalBtn
                    isDisabled={isDisabled}
                    onClick={(e) => {
                      const prev = value;
                      const newSelected = new Set(prev);
                      const prevHasRadical = newSelected.has(radical);
                      prevHasRadical
                        ? newSelected.delete(radical)
                        : newSelected.add(radical);

                      if (prevHasRadical) {
                        e.currentTarget.blur();
                      }

                      setValue(newSelected);
                    }}
                    radical={radical}
                    isSelected={isSelected}
                    isTouchDevice={isTouchDevice}
                  />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const RadicalsSelected = ({
  value,
  onClick,
}: {
  value: string[];
  onClick: (radical: string) => void;
}) => {
  const getBasicInfo = useGetKanjiInfoFn();

  if (getBasicInfo == null) {
    return null;
  }

  return (
    <>
      {value.map((radical) => {
        const radicalKeyword = getBasicInfo(radical)?.keyword ??
          moreRadicalKeywords[radical] ??
          "...";

        return (
          <ExpandedRadicalBtn
            key={radical}
            radical={radical}
            radicalKeyword={radicalKeyword}
            onClick={() => {
              onClick(radical);
            }}
          />
        );
      })}
    </>
  );
};

export const RadicalsResultsPreview = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  const { data, status } = useKanjiSearchResult();

  if (status === "loading" || data == null) {
    return (
      <div className="w-full text-xs h-full font-bold flex justify-center items-center p-2">
        <div>読み込み中 {`(Loading..)`}</div>
      </div>
    );
  }

  if (status === "error") {
    return <SmallUnexpectedErrorFallback />;
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-xs h-full font-bold flex justify-center items-center p-2">
        <div>
          {"すみません 🙇🏽‍♀️ 🙇 . No match found."}
          <ClearFiltersCTA
            defaultMsg={
              <div className="block-inline">
                Try:
                {externalLinks.slice(0, 5).map((item, index) => {
                  return (
                    <span className="block-inline my-1" key={item.name}>
                      <ExternalTextLink
                        href={item.url("捜")}
                        text={item.name}
                      />
                      {index == 3 ? "or" : index === 4 ? "" : ","}
                    </span>
                  );
                })}
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (data.length === KANJI_COUNT) {
    return null;
  }

  return (
    <>
      {data.map((kanji) => {
        return (
          <KanjiItemSimpleButton key={kanji} kanji={kanji} onClick={onClick} />
        );
      })}
    </>
  );
};
