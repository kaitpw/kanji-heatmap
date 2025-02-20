import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { SortOrderSection } from "./sections/SortOrderSection";
import { FilterSection } from "./FilterSection";

const SettingsForm = () => {
  return (
    <section className="flex flex-col items-start justify-start w-full">
      <form className="w-full flex flex-col space-y-4">
        <SortOrderSection />
        <FilterSection />
        <div className="flex w-full justify-end">
          A total of<span className="font-extrabold mx-1">146</span> Kanji
          Characters match your filters
        </div>
        <div className="flex justify-end space-x-1 border-t pt-3">
          <Button variant={"secondary"}>Reset</Button>
          <Button>Apply</Button>
        </div>
      </form>
    </section>
  );
};

const SortAndFilterSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 relative"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Settings2 />
              <span className="sr-only">Sort and Filter Settings</span>
              <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 w-24 text-xs z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
            Sort and Filter Settings
          </HoverCardContent>
        </HoverCard>
      </DialogTrigger>
      <DialogContent
        className={"overflow-y-scroll overflow-x-hidden max-h-screen z-50"}
      >
        <DialogHeader>
          <DialogTitle>Sorting and Filtering Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Manage your Sorting and Filtering Settings
          </DialogDescription>
        </DialogHeader>
        <SettingsForm />
      </DialogContent>
    </Dialog>
  );
};

export default SortAndFilterSettings;
