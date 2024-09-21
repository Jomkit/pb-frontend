import { createContext } from "react";
import { IUser } from "../../types";

const userContext = createContext({} as IUser);

export default userContext;