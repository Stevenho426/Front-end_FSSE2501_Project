import NavList from "../../component/TopNavbar";
import {useLocation} from "@tanstack/react-router";

export default function ThankYouPage() {
  const location = useLocation();

  return (
    <div className="shopping-cart-container">
      <NavList/>
      <h1>Thank You Page!</h1>
      <h3>Pathname: {location.pathname} </h3>

    </div>
  )
}