import {createFileRoute} from "@tanstack/react-router";
import ProductListingPage from "../ui/page/ProductListingPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Route = createFileRoute('/')({
  component: ProductListingPage,
})