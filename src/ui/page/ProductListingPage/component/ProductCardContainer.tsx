import {useEffect, useState} from "react";
import type {GetAllProductDtoType} from "../../../../data/GetAllProductDto.type.ts";
import {Col, Container, Row} from "react-bootstrap"
import ProductCard from "./ProductCard.tsx";
import * as ProductApi from "../../../../api/ProductApi.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import {Link, useNavigate} from "@tanstack/react-router";



export default function ProductCardContainer () {

  const navigate = useNavigate({from: "/"});

  const getAllProductDto = async ()=>{

    try {
      setIsLoading(true);
      const responseData = await ProductApi.getAllProduct();
      setGetAllProductDto(responseData);
      setIsLoading(false);
    }catch {
      navigate({to: "/error"});
    }

  }

  const [getAllProductDtoList, setGetAllProductDto] = useState<GetAllProductDtoType[]|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProductDto();
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <Row>
          {isLoading ? (

            Array.from({length:8}).map(()=> (
              <Col sm={6} md={4} lg={3}>
                <LoadingContainer/>
              </Col>

            ))): getAllProductDtoList? (

            getAllProductDtoList.map((getAllProductDto:GetAllProductDtoType)=>(
              <Col sm={6} md={4} lg={3} className="mb-4">
                <ProductCard getAllProductDto={getAllProductDto} pid={getAllProductDto.pid.toString()} />
              </Col>
            ))) : (
            <Link to="/error"/>
          )
          }
        </Row>
      </div>
    </Container>

  )
}