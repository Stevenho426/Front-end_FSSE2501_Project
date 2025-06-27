import {createRootRoute, Outlet} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import type {UserData} from "../data/user.type.ts";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import {LoginUserContext} from "../../context/loginUserContext.ts";

export const Route = createRootRoute({
  component:RootComponent
});

function RootComponent(){

  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    FirebaseAuthService.onAuthStateChanged(setLoginUser);
  }, []);

  return(

    <LoginUserContext.Provider value={loginUser}>
      <Outlet/>
    </LoginUserContext.Provider>


  )

}

