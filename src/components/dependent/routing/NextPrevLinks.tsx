import { ArrowLeft, ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";

const btnLinkCn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 relative rounded-xl";

export const NextPrevLinks = ({ currentKanji }: { currentKanji: string }) => {
  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  return (
    <>
      <Button
        onClick={handleBack}
        size="icon"
        variant={"outline"}
        className="h-8 w-8 relative rounded-xl"
        title="Go back in browser history"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={handleForward}
        size="icon"
        variant={"outline"}
        className="h-8 w-8 relative rounded-xl"
        title="Go forward in browser history"
      >
        <ArrowRight />
      </Button>
    </>
  );
};
