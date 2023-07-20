import { ProfilerOnRenderCallback } from "react";
import type { Interaction } from "scheduler/tracing";

type ReactProfilerEntry = {
  id: string;
  phase: "mount" | "update";
  duration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<Interaction>;
};

class Sink {
  public static readonly KEY = "__RESULTS__";

  constructor(public results: Map<string, ReactProfilerEntry[]> = new Map()) {
    window[Sink.KEY] = this;
  }

  public addResult(result: ReactProfilerEntry) {
    const { id } = result;
    const results = this.results.get(id) ?? [];
    results.push(result);
    this.results.set(id, results);
  }

  public onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    duration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    console.debug("captured", id, phase, duration, baseDuration);
    this.addResult({
      id,
      phase,
      duration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    });
  };

  public clear() {
    this.results.clear();
  }

  public print() {
    const table: Record<string, Record<"base" | "memo", number>> = {};

    for (const [, results] of this.results) {
      for (const result of results) {
        const { id, baseDuration, phase } = result;

        const newId = `${id
          .replace(/-base/, "")
          .replace(/-memo/, "")}-${phase}`;
        const obj = table[newId] ?? { base: NaN, memo: NaN };

        if (id.includes("memo")) obj.memo = baseDuration;
        else obj.base = baseDuration;

        table[newId] = obj;
      }
    }
    console.table(table);
  }

  public toJSON() {
    return JSON.stringify(Object.fromEntries(this.results));
  }
}

declare global {
  interface Window {
    [Sink.KEY]: Sink;
  }
}

export const sink = new Sink();
