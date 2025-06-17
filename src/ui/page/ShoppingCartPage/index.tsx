import NavList from "../../component/TopNavbar";
import {useLocation} from "@tanstack/react-router";

export default function ShoppingCartPage() {
  const location = useLocation();

  return (
    <div className="shopping-cart-container">
      <NavList/>
      <h1>Shopping Cart Page!</h1>
      <h3>Pathname: {location.pathname} </h3>

    </div>
  )
}