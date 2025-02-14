import { useWindowHeight } from "@react-hook/window-size";
import { HEADER_HEIGHT } from "./constants";

const LoadingKanjis = () => {
  const windowHeight = useWindowHeight();
  const listHeight = windowHeight - HEADER_HEIGHT;

  return (
    <div
      role="status"
      className="w-full flex flex-wrap mx-4 justify-center"
      style={{ maxHeight: listHeight }}
    >
      <div className="sr-only">loading</div>
      {new Array(200).fill(null).map((_, i) => {
        return (
          <div
            key={i}
            className={`h-12 w-10 animate-pulse rounded-lg border-4 mr-1 mb-1 border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800 `}
          />
        );
      })}
    </div>
  );
};

export default LoadingKanjis;
