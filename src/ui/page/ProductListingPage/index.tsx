import NavList from "../../component/TopNavbar";
import {Container} from "react-bootstrap";
import ProductCardContainer from "./component/ProductCardContainer.tsx";

export default function ProductListingPage() {
  // const location = useLocation();

  return (
    <div className="product-listing-container">
      <NavList/>
      {/*<h1> Product Listing Page!</h1>*/}
      {/*<h3>Pathname: {location.pathname} </h3>*/}
      <Container>
        <ProductCardContainer/>
      </Container>

</div>
  )
}