import { useState } from "react";
import { Benchmark as Deps } from "./benchmarks/DependencyArrays";
import { Benchmark as MultiDiv } from "./benchmarks/ManyHooksOneComponent";
import { Benchmark as SingleDiv } from "./benchmarks/OneHookManyComponents";

function App() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Stop" : "Start"}
      </button>
      {show && (
        <div id="tests">
          <SingleDiv id="single-div" />
          <MultiDiv id="multi-div" />
          <Deps id="deps" />
        </div>
      )}
    </>
  );
}

export default App;
