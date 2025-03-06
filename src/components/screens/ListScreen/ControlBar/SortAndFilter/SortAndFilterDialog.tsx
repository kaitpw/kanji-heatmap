import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SearchSettings } from "@/lib/constants";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { SortAndFilterSettingsForm } from "./SortAndFilterForm";

export const SortAndFilterSettingsDialog = ({
  initialValue,
  onSettle,
}: {
  onSettle: (x: SearchSettings) => void;
  initialValue: SearchSettings;
}) => {
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
        <SortAndFilterSettingsForm
          initialValue={initialValue}
          onSettle={(val) => {
            onSettle(val);
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
