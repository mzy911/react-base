import { generateActionTypeCreator } from "@/utils/action";

const namespace = "@error";
const createActionType = generateActionTypeCreator(namespace);

const ACTION = {
  CAUGHT: createActionType("caught"),
  DISMISS: createActionType("dismiss"),
};

export { namespace, ACTION };
