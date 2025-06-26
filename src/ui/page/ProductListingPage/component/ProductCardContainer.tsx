import {useEffect, useState} from "react";
import type {GetAllProductDto} from "../../../../data/GetAllProductDto.ts";
import {Col, Container, Row} from "react-bootstrap"
import ProductCard from "./ProductCard.tsx";
import * as ProductApi from "../../../../api/ProductApi.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import {Link} from "@tanstack/react-router";



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
     <Container className="mt-3">
       <Row>
          {isLoading ? (

           Array.from({length:8}).map(()=> (
            <Col sm={6} md={4} lg={3} className="mb-4">
              <LoadingContainer/>
            </Col>

          ))): getAllProductDtoList? (

          getAllProductDtoList.map((getAllProductDto:GetAllProductDto)=>(
            <Col sm={6} md={4} lg={3} className="mb-4">
              <ProductCard getAllProductDto={getAllProductDto} pid={getAllProductDto.pid.toString()} />
            </Col>
          ))) : (
            <Link to="/error"/>
            )
          }
         </Row>
       </Container>
   </>
  )


  // return (
  //  <>
  //    {!isLoading && getAllProductDtoList ? (
  //      <Container className="mt-3">
  //        <Row>
  //        {getAllProductDtoList.map((getAllProductDto:GetAllProductDto)=>(
  //          <Col key={getAllProductDto.pid} >
  //           <ProductCard getAllProductDto={getAllProductDto} pid={getAllProductDto.pid.toString()} />
  //          </Col>
  //        ))}
  //        </Row>
  //      </Container>
  //      ):
  //      (
  //       <LoadingContainer/>
  //     )
  //   }
  //
  //  </>
  //
  //
  // )

}