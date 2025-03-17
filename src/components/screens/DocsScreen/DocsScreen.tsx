import { useEffect } from "react";
import { useHashLocation } from "wouter/use-hash-location";

const DocsScreen = () => {
  const [location] = useHashLocation();

  useEffect(() => {
    console.log("location", location);
  }, [location]);
  return (
    <div className="mt-14">
      <section id="privacy">Privacy</section>
      <section id="terms">Terms</section>
    </div>
  );
};

export default DocsScreen;
