import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsForm from "./SettingsForm";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

const SortAndFilterSettingsButton = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 relative">
          <Settings2 />
          <span className="sr-only">Sort and Filter Settings</span>
          <div className="absolute -top-1.5 -right-2 h-[18px] w-[18px] border-4 border-white dark:border-black bg-red-500 rounded-full font-bold flex items-center justify-center" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-2 w-32 text-xs z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
        Sort and Filter Settings
      </HoverCardContent>
    </HoverCard>
  );
};

const SortAndFilterSettings = () => (
  <Dialog>
    <DialogTrigger>
      <SortAndFilterSettingsButton />
    </DialogTrigger>
    <DialogContent className={"overflow-y-scroll max-h-screen z-50"}>
      <DialogHeader>
        <DialogTitle>Sorting and Filtering Settings</DialogTitle>
      </DialogHeader>
      <SettingsForm />
    </DialogContent>
  </Dialog>
);

export default SortAndFilterSettings;
