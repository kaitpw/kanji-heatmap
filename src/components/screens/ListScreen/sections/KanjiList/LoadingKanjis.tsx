import { useWindowHeight } from "@react-hook/window-size";
import { HEADER_HEIGHT } from "./constants";

const LoadingKanjis = () => {
  const windowHeight = useWindowHeight();
  const listHeight = windowHeight - HEADER_HEIGHT;

  return (
    <div
      role="status"
      className="w-full flex flex-wrap justify-center mx-0 px-[12px]"
      style={{ maxHeight: listHeight }}
    >
      <div className="sr-only">loading</div>
      {new Array(200).fill(null).map((_, i) => {
        return (
          <div
            key={i}
            className={`h-[52px] w-[42px] animate-pulse rounded-lg border-4 mr-1 mb-1 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 `}
          />
        );
      })}
    </div>
  );
};

export default LoadingKanjis;
