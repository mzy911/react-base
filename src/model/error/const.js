import { generateActionTypeCreator } from "@/utils/model/action";

const namespace = "@error";
const createActionType = generateActionTypeCreator(namespace);

const ACTION = {
  CAUGHT: createActionType("caught"),
  DISMISS: createActionType("dismiss"),
};

export { namespace, ACTION };
