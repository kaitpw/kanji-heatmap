export const JLPTListItem = ({
  label,
  color,
  cn,
}: {
  label: string;
  color: string;
  cn: string;
}) => {
  return (
    <li className="flex justify-center items-center space-x-1 text-xs font-bold">
      <div className={`${cn} h-4 w-4 rounded-sm`}>
        <span className="sr-only">{color}</span>
      </div>
      <span>{label}</span>
    </li>
  );
};
