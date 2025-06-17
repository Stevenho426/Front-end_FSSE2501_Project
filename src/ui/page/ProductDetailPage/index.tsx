import TopNavbar from "../../component/TopNavbar";
import {useLocation, useParams} from "@tanstack/react-router";
import ProductDetailContainer from "./component/ProductDetailContainer.tsx";

export default function ProductDetailPage() {
  const {productId} = useParams({from: "/product/$productId"});
  const location = useLocation();

  return (
    <>
      <TopNavbar/>
      <ProductDetailContainer/>
    </>

  )
}