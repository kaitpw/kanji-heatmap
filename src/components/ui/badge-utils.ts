import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "px-2.5 py-0.5 border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "px-2.5 py-0.5 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "px-2.5 py-0.5 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "px-2.5 py-0.5 text-foreground",
        ja_default:
          "px-2.5 pb-1 border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        ja_secondary:
          "px-2.5 pb-1 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ja_destructive:
          "px-2.5 pb-1 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        ja_outline: "px-2.5 pb-1 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeCn = cn(badgeVariants({ variant: "default" }));
const badgeCnOutline = cn(badgeVariants({ variant: "outline" }));

export { badgeCn, badgeCnOutline, badgeVariants };
