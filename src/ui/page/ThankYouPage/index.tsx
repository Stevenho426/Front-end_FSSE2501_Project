import {Container} from "react-bootstrap";
import TopNavbar from "../../component/TopNavbar";
import TransactionSummary from "./component/TransactionSummary.tsx";
import {useParams} from "@tanstack/react-router";
import {useContext} from "react";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";

export default function ThankYouPage() {

  const {transactionId} = useParams({from:"/thankyou/$transactionId"})

  const loginUser = useContext(LoginUserContext);

  return (

    <>
      <TopNavbar/>
      {
        loginUser &&
          <Container>
            <TransactionSummary tid={transactionId}/>
          </Container>
      }
    </>
  )
}