import React from "react";
import { of, switchMap, mergeMap, interval, map, take } from "rxjs";

const SwitchMap = () => {
  // 1、将每个值映射成 Observable
  // 2、使用 switch 打平所有的 "内部 Observables"
  // 3、只发出最新投射的 Observable 中的值
  const switched = of(1, 2, 3).pipe(
    switchMap((x) =>
      interval(1000)
        .pipe(take(5))
        .pipe(map((i) => x ** i))
    )
  );
  switched.subscribe((x) => console.log(x));
  // 1
  // 1
  // 1
  // 2
  // 4
  // 8
  // 3
  // 9
  // 27

  return (
    <div>
      <h1>SwitchMap</h1>
    </div>
  );
};

export default SwitchMap;
