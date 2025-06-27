import {createContext} from "react";
import {UserData} from "../src/data/user.type";

export const LoginUserContext = createContext<UserData|null|undefined>(undefined);

