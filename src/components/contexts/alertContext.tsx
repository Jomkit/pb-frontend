import { createContext } from "react";

const alertContext = createContext({} as {setAlertMessage: Function, setAlertOn: Function});

export default alertContext