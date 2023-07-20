import {
  // MemoryMemoRecomputeUpdating as RecomputingMemo,
  // MemoryMemoUpdating as Memo,
  MemoryUpdating as Base,
} from "./benchmarks/Memory";

function App() {
  // To test out the specific case uncomment one of the following lines, wait for a bit and then manually run GC in the browser, then start profiling.

  // I will not bother automating this xd
  return (
    <div id="tests">
      {/* Large cases: */}
      <Base n={1024} every={500} offset={2000} />
      {/* <Memo n={1024} every={500} offset={2000} /> */}
      {/* <RecomputingMemo n={1024} every={500} offset={2000} /> */}
      {/* Small cases: */}
      {/* <Base n={10} every={100} offset={2000} /> */}
      {/* <RecomputingMemo n={10} every={100} offset={2000} /> */}
    </div>
  );
}

export default App;
