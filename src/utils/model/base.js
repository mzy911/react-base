import _isFunction from "lodash/isFunction";

// 基础错误
export default class extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.name = "BaseError";
    this.title = "";

    if (_isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  // 获取失败的id
  getRequestId() {
    // 请求头id
    if (this.fetch?.options?.headers) {
      return this.fetch.options.headers["requestId"];
    }

    // 响应头id
    if (this.fetch?.responseJson?.requestId) {
      return this.fetch.responseJson.requestId;
    }

    return "";
  }

  toJSON() {
    return {
      message: this.message || "",
      fetch: this.fetch || {},
      name: this.name || "",
    };
  }
}
