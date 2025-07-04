import TopNavbar from "../../component/TopNavbar";
import {Container} from "react-bootstrap";
import CartTable from "./component/CartTable.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useContext, useEffect} from "react";
import {LoginUserContext} from "../../../../context/loginUserContext.ts";


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
    <Container>
      <TopNavbar/>
      <CartTable/>
    </Container>

  )
}