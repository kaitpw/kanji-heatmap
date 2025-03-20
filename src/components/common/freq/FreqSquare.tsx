import { cnSquare } from "@/lib/generic-cn";

export const FreqSquare = ({ srOnly, cn }: { srOnly: string; cn: string }) => {
  return (
    <div className={`${cn} h-4 w-4 ${cnSquare}`}>
      <span className="sr-only">{srOnly}</span>
    </div>
  );
};
