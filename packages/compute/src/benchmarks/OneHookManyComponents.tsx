import { FC, Fragment, Profiler, useMemo } from "react";
import { getContent } from "../getContent";
import { sink } from "../Sink";
import { replicate } from "../replicate";
import { Ns, UPDATE_MAX, UPDATE_MS } from "../config";
import { updating } from "../updating";

const Div = replicate(() => {
  const content = getContent();
  return <div>{content}</div>;
});

const DivMemo = replicate(() => {
  const content = useMemo(() => getContent(), []);
  return <div>{content}</div>;
});

const DivUpdating = updating(Div);
const DivMemoUpdating = updating(DivMemo);

export const Benchmark: FC<{ id: string }> = ({ id }) => {
  return Ns.map((n) => (
    <Fragment key={`${id}-${n}`}>
      <Profiler id={`${id}-base-${n}`} onRender={sink.onRender}>
        <DivUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>

      <Profiler id={`${id}-memo-${n}`} onRender={sink.onRender}>
        <DivMemoUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>
    </Fragment>
  ));
};
