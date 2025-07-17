import TopNavbar from "../../component/TopNavbar";
import ProductDetailContainer from "./component/ProductDetailContainer.tsx";
import {Container} from "react-bootstrap";
import {useParams} from "@tanstack/react-router";

export default function ProductDetailPage() {
   const {productId} = useParams({from: "/product/$productId"});

  return (
    <>
      <TopNavbar/>
      <Container>
        <ProductDetailContainer pid={productId}/>
      </Container>
    </>

  )
}