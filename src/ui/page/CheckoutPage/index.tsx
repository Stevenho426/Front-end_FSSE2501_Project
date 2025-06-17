import NavList from "../../component/TopNavbar";
import {useLocation, useParams} from "@tanstack/react-router";

export default function CheckoutPage() {
  const params = useParams({from: "/checkout/$transactionId"});
  const location = useLocation();

  return (
    <div className="shopping-cart-container">
      <NavList/>
      <h1>Checkout Page!</h1>
      <h2>TransactionID is {params.transactionId}</h2>
      <h3>Pathname: {location.pathname} </h3>

    </div>
  )
}