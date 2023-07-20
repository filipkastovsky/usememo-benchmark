import { FC } from "react";
import { Never } from "./utils.types";

export type ReplicateProps = { n: number };

export const replicate =
  <P extends object>(
    Component: FC<P & Never<ReplicateProps>>
  ): FC<P & ReplicateProps> =>
  ({ n, ...props }) =>
    Array.from({ length: n }, (_, i) => (
      <Component key={i} {...(props as P & Never<ReplicateProps>)} />
    ));
