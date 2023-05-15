// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve({});
    },1000)
  });
};
