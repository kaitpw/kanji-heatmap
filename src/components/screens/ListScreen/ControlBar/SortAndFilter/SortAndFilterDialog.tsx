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
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { SortAndFilterSettingsForm } from "./SortAndFilterForm";
import { SearchSettings } from "@/lib/settings";
import { ChangedIndicator } from "./SortContent/ChangeIndicator";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export const SortAndFilterSettingsDialog = ({
  initialValue,
  onSettle,
}: {
  onSettle: (x: SearchSettings) => void;
  initialValue: SearchSettings;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
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
              <ChangedIndicator />
            </Button>
          </DialogTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="p-2 w-24 text-xs z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
          Sort and Filter Settings
        </HoverCardContent>
      </HoverCard>
      <DialogContent
        className={
          "overflow-y-auto max-h-svh z-50 flex flex-col px-4 pt-8 pb-4"
        }
      >
        <DialogHeader>
          <DialogTitle className="text-left pb-4 m-0">
            Sorting and Filtering Settings
          </DialogTitle>
          <DialogDescription className="sr-only">
            Manage your Sorting and Filtering Settings
          </DialogDescription>
        </DialogHeader>
        <ErrorBoundary>
          <SortAndFilterSettingsForm
            initialValue={initialValue}
            onSettle={(val) => {
              onSettle(val);
              setIsOpen(false);
            }}
          />
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};
