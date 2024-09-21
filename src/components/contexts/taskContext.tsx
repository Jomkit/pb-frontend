// task context, currently unused
import React from "react";
import { ITask } from "../../types";

const taskContext = React.createContext([] as ITask[]);

export default taskContext;