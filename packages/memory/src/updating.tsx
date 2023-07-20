import { FC, useEffect, useState } from "react";
import { Never } from "./utils.types";

type UpdatingProps = { every: number; offset?: number; max?: number };

export const updating =
  <P extends object>(
    Component: FC<P & Never<UpdatingProps>>
  ): FC<P & UpdatingProps> =>
  ({ every, offset = 0, max = Number.MAX_SAFE_INTEGER, ...props }) => {
    const [, forceUpdate] = useState({});

    useEffect(() => {
      let count = 0;
      let interval: number;

      // JS timers moment
      const timeout = window.setTimeout(() => {
        interval = window.setInterval(() => {
          if (count++ >= max) return cleanup();
          forceUpdate({});
        }, every);
      }, offset);

      function cleanup() {
        window.clearTimeout(timeout);
        window.clearInterval(interval);
      }

      return cleanup;
      //* Props are meant to be static in this case, I will not write code to make this dependant on props
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Component must not be a `memo`, that would defeat the purpose of this
    return <Component {...(props as P & Never<UpdatingProps>)} />;
  };
