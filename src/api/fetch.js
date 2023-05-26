import axios from "axios";
import FetchBizError from "@/api/fetch-biz";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:3536",
    timeout: 5000,
  });

  // 2.响应拦截(拦截到返回的结果)
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const errorObject = new FetchBizError(
        err.message,
        err.config.baseURL + "/" + err.config.url,
        {
          ...err.config,
        },
        err.response
      );

      //拦截失败
      throw errorObject;
    }
  );
  return instance(config);
}
