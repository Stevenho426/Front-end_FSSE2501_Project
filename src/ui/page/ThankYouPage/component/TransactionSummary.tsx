import * as TransactionApi from "../../../../api/TransactionApi";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import type {TransactionDto} from "../../../../data/TransactionProduct.type.ts";
import {format} from "date-fns";
import LoadingContainer from "../../../component/LoadingContainer";
import {Link, useNavigate} from "@tanstack/react-router";


type Props = {
  tid: string;
}

export default function TransactionSummary ({tid}:Props) {


  const [transactionDto, setTransactionDto] = useState<TransactionDto|undefined>(undefined);
  const navigate = useNavigate({from: "/thankyou/$transactionId"})

  const getTransactionDetails = async ()=>{
    try{
      const responseData = await TransactionApi.getTransactionDetailsById(tid);
      setTransactionDto(responseData);
    }catch{
      navigate({to: "/error"});
    }
  }



  useEffect(() => {
    getTransactionDetails();

  }, []);

  if(!transactionDto){
    return <LoadingContainer/>
  }

  return (


      <Container className="mt-4">
        {/* Transaction Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Thank you for your order! Transaction Summary</Card.Title>
            <Row className="mb-2">
              <Col md={6}><strong>Transaction ID:</strong> {transactionDto.tid}</Col>
              <Col md={6}><strong>Date:</strong> {format(transactionDto.datetime, "yyyy/MM/dd/H:mm:ss")}</Col>
            </Row>
            <Row>
              <Col md={6}><strong>Status:</strong> {transactionDto.status}</Col>
              <Col md={6}><strong>Total:</strong> ${transactionDto.total.toFixed(2)}</Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Header-like Row */}
        <Row className="fw-bold border-bottom pb-2 mb-2">
          <Col md={4}>Product</Col>
          <Col md={2}>Qty</Col>
          <Col md={3}>Price</Col>
          <Col md={3}>Subtotal</Col>
        </Row>

        {/* Product Items */}
        {transactionDto.items.map((item, index) => (
          <Row key={index} className="mb-2 pb-2 border-bottom">
            <Col md={4}>{item.product.name}</Col>
            <Col md={2}>{item.quantity}</Col>
            <Col md={3}>${item.product.price.toFixed(2)}</Col>
            <Col md={3}>${(item.quantity * item.product.price).toFixed(2)}</Col>
          </Row>
        ))}
        <Row className="mt-5">
          <Col md={{span: 4, offset: 4}}>
            <Link
              to = "/"
              className="text-decoration-none text-black"
            >
              Thank you! Go back to the home now!
            </Link>
          </Col>
        </Row>
      </Container>
  )

}