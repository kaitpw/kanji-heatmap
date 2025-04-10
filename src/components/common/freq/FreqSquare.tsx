import { cnSquare } from "@/lib/generic-cn";

export const FreqSquare = ({
  srOnly,
  cn,
  style,
}: {
  srOnly: string;
  cn: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={`${cn} h-4 w-4 ${cnSquare}`} style={style}>
      <span className="sr-only">{srOnly}</span>
    </div>
  );
};
