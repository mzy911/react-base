import { generateActionFn } from "@/utils/model/action";

import { ACTION } from "./const";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  caught: generateActionFn(ACTION.CAUGHT),
  dismiss: generateActionFn(ACTION.DISMISS),
};
