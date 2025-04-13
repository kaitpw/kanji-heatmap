import ErrorBoundary from "@/components/error/ErrorBoundary";
import { CircleX } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  Drawer,
} from "@/components/ui/drawer";
import { ReactNode } from "react";

export const RadicalsScreenDialog = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} autoFocus={true}>
      <DrawerContent className="!select-text h-[100dvh] !duration-200">
        <DrawerTitle className="sr-only">Radical Search</DrawerTitle>
        <DrawerDescription className="sr-only">
          Search by Radical
        </DrawerDescription>
        <ErrorBoundary>{children}</ErrorBoundary>
        <DrawerClose asChild className="absolute top-0 right-0 z-50">
          <Button
            variant="secondary"
            size="icon"
            className="mx-1 mt-1 rounded-full border-2 border-dotted flex justify-center item-center"
          >
            <CircleX />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
