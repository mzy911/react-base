// 登录
export function loginMboile(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          data: "wkhfhefhiwefqqoi7i4biwgiwhwfwcy283",
        },
        msg: "登录成功",
      });
    }, 1000);
  });
}

// 登出
export function logoutMboile(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        msg: "登出成功",
      });
    }, 1000);
  });
}
