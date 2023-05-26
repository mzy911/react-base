import React from "react";
import { of, mergeMap, interval, map, take, switchMap } from "rxjs";

const MergeMap = () => {
  // 1、将每个值映射成 Observable
  // 2、使用 mergeAll 打平所有的 "内部 Observables"
  // 3、合并到输出 Observable 中
  const letters = of("a", "b", "c");
  const result = letters.pipe(
    mergeMap((x) =>
      interval(1000)
        .pipe(take(5))
        .pipe(map((i) => x + i))
    )
  );

  result.subscribe((x) => console.log(x));

  // mergeMap 的输出结果：每隔一秒输出：an、bn、cn三个值
  // a0
  // b0
  // c0
  // a1
  // b1
  // c1
  // ...
  // a4
  // b4
  // c4

  // switchMap 的输出结果：每隔一秒输出：cn
  // c0
  // c1
  // c2
  // c3
  // c4

  return (
    <div>
      <h1>MergeMap</h1>
    </div>
  );
};

export default MergeMap;
