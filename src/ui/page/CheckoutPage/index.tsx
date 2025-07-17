import {useLocation, useNavigate, useParams} from "@tanstack/react-router";
import {useContext} from "react";
import TopNavbar from "../../component/TopNavbar";
import TransactionTable from "./component/TransactionTable.tsx";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";
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

      <>
        <TopNavbar/>
        <TransactionTable tid={tid}/>
      </>


  )
}