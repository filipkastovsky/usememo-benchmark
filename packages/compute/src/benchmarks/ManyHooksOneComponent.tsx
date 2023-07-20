import { FC, Fragment, Profiler, useMemo } from "react";
import { getContent } from "../getContent";
import { sink } from "../Sink";
import { Ns, UPDATE_MAX, UPDATE_MS } from "../config";
import { updating } from "../updating";

const MultiDiv: FC<{ n: number }> = ({ n }) => {
  const contents = Array.from({ length: n }, () => getContent());

  return contents.map((content, i) => <div key={`${n}-${i}`}>{content}</div>);
};

const MultiDivMemo: FC<{ n: number }> = ({ n }) => {
  const contents = Array.from({ length: n }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => getContent(), [])
  );

  return contents.map((content, i) => <div key={`${n}-${i}`}>{content}</div>);
};

const MultiDivUpdating = updating(MultiDiv);
const MultiDivMemoUpdating = updating(MultiDivMemo);

export const Benchmark: FC<{ id: string }> = ({ id }) => {
  return Ns.map((n) => (
    <Fragment key={`${id}-${n}`}>
      <Profiler id={`${id}-base-${n}`} onRender={sink.onRender}>
        <MultiDivUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>

      <Profiler id={`${id}-memo-${n}`} onRender={sink.onRender}>
        <MultiDivMemoUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>
    </Fragment>
  ));
};
