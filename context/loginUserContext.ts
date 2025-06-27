import {createContext} from "react";
import type {UserData} from "../src/data/user.type.ts";


export const LoginUserContext = createContext<UserData|null|undefined>(undefined);

