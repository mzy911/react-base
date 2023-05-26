
import { request } from "@/api/fetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  if (Math.random() > 10) {
    // 抛出异常
    return await request({ url: "/meinv11" });
  } else {
    // 成功返回数据
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            data: [
              { name: "张三", age: 14 },
              { name: "李四", age: 15 },
              { name: "王武", age: 16 },
            ],
          }
        );
      }, 1000);
    });
  }
};
