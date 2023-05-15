import BaseError from "./base";

// 接口返回值的错误处理
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends BaseError {
  constructor(message, fetchUrl = "", fetchOptions, responseJson) {
    super(message);

    this.name = "FetchBizError";
    this.code = responseJson?.code || "";
    this.fetch = {
      url: fetchUrl,
      options: fetchOptions,
      responseJson, // {code:string; data:any; requestId:string; relatedId:string;}
    };
    this.requestId = this.getRequestId();
  }

  // 业务虽然出错、返回响应的数据
  getResponseJson() {
    return this.fetch.responseJson;
  }

  // 获取业务错误码
  getCode() {
    return this.code;
  }

  // 将code设置成AccessDenied
  setAccessDeniedCode() {
    this.code = "AccessDenied";
  }

  // 获取业务错误对象
  getData() {
    return this.fetch.responseJson.data;
  }

  // 获取后端返回的 requestId
  getRelatedId() {
    const reg = RegExp(/\/api\/imminner\//);
    if (reg.exec(this.fetch.url)) {
      return (
        this.fetch.responseJson.relatedId || this.fetch.responseJson.requestId
      );
    }
    return this.fetch.responseJson.relatedId;
  }
}
