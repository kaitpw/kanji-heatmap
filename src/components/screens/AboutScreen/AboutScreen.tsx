import useHtmlDocumentTitle from "@/hooks/use-html-document-title";

const AboutScreen = () => {
  useHtmlDocumentTitle("About - Kanji Heatmap");
  return (
    <div className="my-20 flex flex-col items-center justify-center w-full">
      <div className="max-w-2xl">
        <section className="py-20">
          <h1 className="text-3xl">About</h1>
          <p className="my-20">Coming soon.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutScreen;
