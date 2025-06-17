import {useEffect, useState} from "react";
import type {GetAllProductDto} from "../../../../data/GetAllProductDto.ts";
import mockData from "../response.json"
import {Col, Container, Row} from "react-bootstrap"
import ProductCard from "./ProductCard.tsx";

export default function ProductCardContainer () {

  const [getAllProductDtoList, setGetAllProductDto] = useState<GetAllProductDto[]>(mockData);

  useEffect(() => {

  }, []);

  return (
   <>
     <Container className="mt-3">
       <Row>
       {getAllProductDtoList.map((getAllProductDto:GetAllProductDto)=>(
         <Col key={getAllProductDto.pid}>
          <ProductCard getAllProductDto={getAllProductDto} />
         </Col>
       ))}
       </Row>
     </Container>

   </>


  )

}