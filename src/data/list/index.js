// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [
          { name: "张三", age: 14 },
          { name: "李四", age: 15 },
          { name: "王武", age: 16 },
        ],
      });
    }, 1000);
  });
};
