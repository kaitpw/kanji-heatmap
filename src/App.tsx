import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount((x) => x + 1)}>Click me</Button>
      {count}
    </>
  );
}

export default App;
