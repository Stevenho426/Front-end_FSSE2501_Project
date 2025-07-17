import TopNavbar from "../../component/TopNavbar";
import CartTable from "./component/CartTable.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useContext, useEffect} from "react";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";


export default function ShoppingCartPage() {

  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate();

  useEffect(() => {

      if(!loginUser){
        navigate({
          to: "/login",
          search: { redirect: location.pathname },
        });
      }
  }, [loginUser]);


  return (
    <>
      <TopNavbar/>
      <CartTable/>
    </>

  )
}