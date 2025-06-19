import {useEffect, useState} from "react";
import type {GetAllProductDto} from "../../../../data/GetAllProductDto.ts";
import {Col, Container, Row} from "react-bootstrap"
import ProductCard from "./ProductCard.tsx";
import * as ProductApi from "../../../../api/ProductApi.tsx";


export default function ProductCardContainer () {

  const getAllProductDto = async ()=>{
    setIsLoading(true);
    const responseData = await ProductApi.getAllProduct();
    setGetAllProductDto(responseData);
    setIsLoading(false);
  }


  const [getAllProductDtoList, setGetAllProductDto] = useState<GetAllProductDto[]|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProductDto();
  }, []);

  return (
   <>
     {!isLoading && getAllProductDtoList &&
     <Container className="mt-3">
       <Row>
       {getAllProductDtoList.map((getAllProductDto:GetAllProductDto)=>(
         <Col key={getAllProductDto.pid}>
          <ProductCard getAllProductDto={getAllProductDto} pid={getAllProductDto.pid.toString()} />
         </Col>
       ))}
       </Row>
     </Container>
     }

   </>


  )

}