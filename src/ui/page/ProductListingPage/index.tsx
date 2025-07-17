import {Col, Container, Row} from "react-bootstrap";
import ProductCardContainer from "./component/ProductCardContainer.tsx";
import TopNavbar from "../../component/TopNavbar";
import ItemCarousel from "./component/ItemCarousel.tsx";

export default function ProductListingPage() {
  // const location = useLocation();

  return (

    <>
      <TopNavbar/>
        <Container>
          <div className="d-flex justify-content-center flex-column">
            <Row className="mt-4">
              <Col>
                <ItemCarousel/>
              </Col>
            </Row>
            <Row className="mt-4 mb-4">
              <Col>
                <ProductCardContainer />
              </Col>
            </Row>
          </div>
        </Container>
    </>


  )
}