import {useLocation, useNavigate, useParams} from "@tanstack/react-router";
import {useContext} from "react";
import TopNavbar from "../../component/TopNavbar";
import {Container} from "react-bootstrap";
import TransactionTable from "./component/TransactionTable.tsx";
import {LoginUserContext} from "../../../../context/loginUserContext.ts";
import LoadingContainer from "../../component/LoadingContainer";


export default function CheckoutPage() {

  const {transactionId}=useParams({from: "/checkout/$transactionId"});
  const tid=transactionId;
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  if(loginUser===null){
    navigate({
      to: "/login",
      search: {redirect: location.pathname}
    })
  } else if (loginUser===undefined){
    return <LoadingContainer/>
  }

  return (

      <Container>
        <TopNavbar/>
        <TransactionTable tid={tid}/>
      </Container>
  )
}