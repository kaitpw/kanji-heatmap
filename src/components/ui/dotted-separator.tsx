import { Separator } from "@radix-ui/react-separator";

export const DottedSeparator = ({ className }: { className?: string }) => {
  return <Separator className={`border-b border-dotted ${className ?? ""}`} />;
};
