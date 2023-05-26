import React from "react";
import { fromEvent, map, interval, mergeAll, take } from "rxjs";

const MergeAll = ({ list, fetchList }) => {

  // 1、为每个点击事件创建一个新的 interval Observable，并将其输出混合为一个 Observable
  // 2、第一次点击、每秒输出一个数字：0、1、2、3......
  // 3、第二次在第一次2秒后点击：0、1、2、[0、3]、[1、4]......
  const clicks = fromEvent(document, "click");
  const higherOrder = clicks.pipe(map(() => interval(1000).pipe(take(5)))); // take规定每个定时器执行次数
  const firstOrder = higherOrder.pipe(mergeAll()); // mergeAll(n) 通知存在n个定时器
  firstOrder.subscribe((x) => console.log(x));

  return (
    <div>
      <h1>MergeAll</h1>
    </div>
  );
};

export default MergeAll
