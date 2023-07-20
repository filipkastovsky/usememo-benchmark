import { FC, Fragment, Profiler, useMemo } from "react";
import { getContent } from "../getContent";
import { sink } from "../Sink";
import { Ns, UPDATE_MAX, UPDATE_MS } from "../config";
import { updating } from "../updating";

const Deps: FC<{ n: number }> = ({ n }) => {
  const content = useMemo(
    () => getContent(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.from({ length: n }, (_, i) => i)
  );

  return <div>{content}</div>;
};

const DepsUpdating = updating(Deps);

export const Benchmark: FC<{ id: string }> = ({ id }) => {
  return Ns.map((n) => (
    <Fragment key={`${id}-${n}`}>
      <Profiler id={`${id}-base-${n}`} onRender={sink.onRender}>
        <DepsUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>

      <Profiler id={`${id}-memo-${n}`} onRender={sink.onRender}>
        <DepsUpdating n={n} every={UPDATE_MS} max={UPDATE_MAX} />
      </Profiler>
    </Fragment>
  ));
};
