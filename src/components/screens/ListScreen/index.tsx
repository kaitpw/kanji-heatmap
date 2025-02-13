import ControlBar from "./sections/ControlBar";
import KanjiList from "./sections/KanjiList";

const ListScreen = () => {
  return (
    <div className="relative">
      <div className="sticky top-[50px] bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm px-2 pb-2 z-50">
        <ControlBar />
      </div>

      <div
        className="overflow-auto relative top-12 z-0"
        style={{ height: "calc(100svh - 100px)" }}
      >
        <KanjiList />
      </div>
    </div>
  );
};

export default ListScreen;
