import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverCardArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "wouter";

const KanjiPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex text-4xl md:text-5xl lg:text-7xl h-auto p-0 z-1 kanji-font"
        >
          時 時 間
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1 m-0">
        <PopoverCardArrow />
        <div className="flex justify-start">
          <Link
            to="/?openedKanji=時"
            className={
              "flex flex-col m-1 p-1 hover:bg-gray-100 dark:bg-gray-900 rounded-md"
            }
          >
            <Badge variant="outline">Time</Badge>
            <div>時</div>
          </Link>
          <Link
            to="/?openedKanji=間"
            className={
              "flex flex-col space-x-2 hover:bg-gray-100 dark:bg-gray-900 rounded-md m-1 p-1"
            }
          >
            <Badge variant="outline">Gate</Badge>
            <div>間</div>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
const HiraganaWord = () => {
  const [isRomaji, setIsRomaji] = useState(false);

  if (isRomaji) {
    return (
      <Button
        variant="ghost"
        className="flex z-0 text-md lg:text-2xl  kanji-font"
        onClick={() => setIsRomaji((prev) => !prev)}
      >
        <span className="text-md lg:text-2xl lg:h-9">shi</span>
        <span className="text-md lg:text-2xl lg:h-9 px-2  bg-black rounded-full text-white">
          kan
        </span>
        <span className="text-md lg:text-2xl lg:h-9">shi</span>
      </Button>
    );
  }
  return (
    <Button
      variant="ghost"
      className="flex kanji-font"
      onClick={() => setIsRomaji((prev) => !prev)}
    >
      <span className="text-md lg:text-2xl lg:h-9">じ</span>
      <span className="text-md lg:text-2xl lg:h-9 px-2  bg-black rounded-full text-white">
        かん
      </span>
      <span className="text-md lg:text-2xl lg:h-9">じ</span>
    </Button>
  );
};
const WordCard = () => {
  return (
    <Card className="h-full flex justify-center items-center py-2">
      <div>
        <div className="flex flex-col items-center justify-center">
          <HiraganaWord />

          <KanjiPopover />
          <div className="text-xs mt-1">Time, Hours of..</div>
        </div>
      </div>
    </Card>
  );
};
export function DrawerDemoRaw({
  onClose,
  isOpen,
  kanji,
}: {
  isOpen: boolean;
  onClose: () => void;
  kanji?: string | null;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="!select-text h-[95svh] ">
        <DrawerTitle className="sr-only">
          Information for Kanji {kanji}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          Includes Sample Usage, Semantic Phonetic Compositions{" "}
        </DrawerDescription>
        <div className="w-full flex flex-col md:flex-row md:space-x-1">
          <div className="md:w-1/2 border-4 border-dashed m-2 rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-2 pb-0 md:pb-2 md:pr-0">
                <Card className="flex-col py-2 md:py-8 justify-center items-center space-y-2">
                  <div className="text-5xl sm:text-9xl md:text-[180px] lg:text-[250px] kanji-font">
                    {kanji}
                  </div>
                  <div className="text-md uppercase">Interval</div>
                </Card>
              </div>
              <div className="flex md:flex-col md:w-1/2">
                <div className="md:h-1/2 w-1/2 h-full md:w-full mt-2 mb-1 md:m-0 px-2 md:pt-2 md:pb-1">
                  <WordCard />
                </div>

                <div className="md:h-1/2 w-1/2 h-full md:w-full mt-2 mb-1 md:m-0 px-2 md:pt-1 md:pb-2">
                  <WordCard />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mx-2 grow mb-2">
              <Card className="m-1 p-2 flex h-full grow justify-center items-center border-dashed border-2">
                <div className="flex flex-col m-1">
                  <Card className="kanji-font flex justify-center items-center text-3xl h-14 w-14 rounded-full">
                    時
                  </Card>
                  <div className="text-xs mt-1 uppercase"> Leaf </div>
                </div>
                <div className="flex flex-col m-1">
                  <Card className="kanji-font flex justify-center items-center text-3xl h-14 w-14 rounded-full">
                    時
                  </Card>
                  <div className="text-xs mt-1 uppercase"> Leaf </div>
                </div>
                <div className="flex flex-col m-1">
                  <Card className="kanji-font flex justify-center items-center text-3xl h-14 w-14 rounded-full">
                    時
                  </Card>
                  <div className="text-xs mt-1 uppercase"> Leaf </div>
                </div>
              </Card>
              <Button
                variant="outline"
                className="flex rounded-md h-full border-2 -mr-2 w-20 border-dashed"
              >
                <div className="flex flex-col">
                  <div className="text-md uppercase kanji-font"> じじ </div>
                  <div>時</div>
                </div>
              </Button>
            </div>
            <div className="flex space-x-1 justify-center flex-wrap space-y-1 mb-4">
              <div />
              <Badge className="flex text-nowrap" variant={"outline"}>
                JLPT N5
              </Badge>
              <Badge className="flex text-nowrap" variant={"outline"}>
                Netflix 5 ⭐
              </Badge>
              <Badge className="flex text-nowrap" variant={"outline"}>
                Twitter 4 ⭐
              </Badge>
              <Badge className="flex text-nowrap" variant={"outline"}>
                Wikipedia 2 ⭐
              </Badge>
              <Badge className="flex text-nowrap" variant={"outline"}>
                News 2 ⭐
              </Badge>
            </div>
          </div>
          <div className="md:w-1/2">Hello</div>
        </div>
        <DrawerClose asChild className="absolute -top-1 right-0">
          <Button variant="ghost" size="icon" className="m-2">
            <X />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export const DrawerDemo = React.memo(DrawerDemoRaw);

const HoverMeRaw = ({
  trigger,
  isOpen,
  setOpen,
  openDrawer,
}: {
  trigger: string;
  isOpen: boolean;
  setOpen: (kanji: string | null) => void;
  openDrawer: (kanji: string | null) => void;
}) => {
  return (
    <>
      <HoverCard
        openDelay={200}
        closeDelay={200}
        onOpenChange={() => {
          setOpen(isOpen ? null : trigger);
        }}
        open={isOpen}
      >
        <HoverCardTrigger asChild>
          <button
            className="p-1.5 rounded-lg text-2xl border-4 mr-1 mb-1 kanji-font text-white border-lime-300 bg-[#fb02a8] bg-opacity-100 z-0 hover:border-[#2effff]"
            onClick={() => {
              setOpen(null);
              openDrawer(trigger);
            }}
          >
            {trigger}
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow />
          <div>
            Hello! {trigger}
            <Button
              onClick={() => {
                setOpen(null);
                openDrawer(trigger);
              }}
            >
              Click Me to Open Drawer
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

const HoverMe = React.memo(HoverMeRaw);

export default HoverMe;
