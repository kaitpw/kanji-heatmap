import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Copy, Clipboard, CheckCircle } from "../icons";

type CopyIconType = "clipboard" | "copy";
const copyIcons: Record<CopyIconType, ReactNode> = {
  clipboard: <Clipboard />,
  copy: <Copy />,
};

export const CopyButton = ({
  textToCopy,
  iconType,
}: {
  textToCopy: string;
  iconType: CopyIconType;
}) => {
  const { copy, status } = useCopyToClipboard();
  return (
    <Button
      variant={"outline"}
      size="icon"
      className={"h-8 w-8 relative rounded-xl"}
      onClick={(e) => {
        copy(textToCopy, e);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {status === "copied" ? <CheckCircle /> : copyIcons[iconType]}
    </Button>
  );
};
