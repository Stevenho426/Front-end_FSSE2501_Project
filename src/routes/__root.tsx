import {createRootRoute, Outlet} from '@tanstack/react-router'
import type {UserData} from "../data/user.type.ts";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import {LoginUserContext} from "../../context/LoginUserContext.ts";
import LoadingContainer from "../ui/component/LoadingContainer";
import {useEffect, useState} from "react";
import {CartItemProvider} from "../../context/CartItemContext.tsx";

export const Route = createRootRoute({
  component:RootComponent
});

function RootComponent(){

  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);


  useEffect(() => {
    FirebaseAuthService.onAuthStateChanged(setLoginUser);
  }, []);

  if(loginUser===undefined){
    return <LoadingContainer/>
  }

  return(
    <LoginUserContext value={loginUser}>
      <CartItemProvider>
        <Outlet/>
      </CartItemProvider>
    </LoginUserContext>

  )

}

