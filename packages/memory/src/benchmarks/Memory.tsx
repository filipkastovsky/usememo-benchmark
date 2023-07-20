import { FC, useMemo } from "react";
import { getContent } from "../getContent";
import { updating } from "../updating";

const Memory: FC<{ n: number }> = ({ n }) => {
  getContent(n);

  return <div />;
};

const MemoryMemo: FC<{ n: number }> = ({ n }) => {
  useMemo(() => getContent(n), [n]);

  return <div />;
};

const MemoryMemoRecompute: FC<{ n: number }> = ({ n }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => getContent(n), [Math.random()]);

  return <div />;
};

export const MemoryUpdating = updating(Memory);
export const MemoryMemoUpdating = updating(MemoryMemo);
export const MemoryMemoRecomputeUpdating = updating(MemoryMemoRecompute);
