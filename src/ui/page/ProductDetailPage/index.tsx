import TopNavbar from "../../component/TopNavbar";
// import {useLocation, useParams} from "@tanstack/react-router";
import ProductDetailContainer from "./component/ProductDetailContainer.tsx";
import {Container} from "react-bootstrap";
import {useParams} from "@tanstack/react-router";

export default function ProductDetailPage() {
   const {productId} = useParams({from: "/product/$productId"});
  // const location = useLocation();

  return (
    <>
      <TopNavbar/>
      <Container>
        <ProductDetailContainer pid={productId}/>
      </Container>
    </>

  )
}