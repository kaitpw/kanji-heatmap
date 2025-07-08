import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CheckCircle, Clipboard, Copy, Link, Link2 } from "../icons";

type CopyIconType = "clipboard" | "copy" | "link" | "link2";
const copyIcons: Record<CopyIconType, ReactNode> = {
  clipboard: <Clipboard />,
  copy: <Copy />,
  link: <Link />,
  link2: <Link2 />,
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
