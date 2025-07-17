import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import TransactionTableItem from "./TransactionTableItem.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import type {TransactionDto, TransactionProduct} from "../../../../data/TransactionProduct.type.ts";
import {useContext, useEffect, useState} from "react";
import * as TransactionApi from "../../../../api/TransactionApi.tsx";
import {useNavigate} from "@tanstack/react-router";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";
import * as cartItemsApi from "../../../../api/CartItemsApi.tsx"
import {CartItemContext} from "../../../../../context/CartItemContext.tsx";

type Props = {
  tid: string;
}

export default function TransactionTable ({tid}:Props):React.JSX.Element {

  const [transactionDto, setTransactionDto] = useState<TransactionDto|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [payment, setPayment] = useState<string>("Select your payment method");
  const cartItemContext = useContext(CartItemContext);


  const getTransactionDetailsById = async ()=> {

    try {
      setIsLoading(true);
      const responseData = await TransactionApi.getTransactionDetailsById(tid);

        console.log(responseData)
        setTransactionDto(responseData);

    } catch {
      navigate({to: "/error"})
    } finally {
      setIsLoading(false);
    }
  }

  const handleTransaction = async ()=>{

    try{
      setIsLoading(true);
      await TransactionApi.updateTransactionStatus(tid);
      const responseData = await TransactionApi.finishTransaction(tid);
      setTransactionDto(responseData);
      const cartItemData = await cartItemsApi.getCartItemsDtoList();
      cartItemContext.setCartItemListContext(cartItemData);
      console.log(`Status after finishing transaction is: ${transactionDto?.status}`);

      navigate({
        to: "/thankyou/$transactionId",
        params: {transactionId: tid}
      })
    } catch {
      navigate({to: "/error"});
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectPayment = (payment:string)=>{
    console.log(payment);
    setPayment(payment);
  }

  useEffect(() => {
    getTransactionDetailsById();
  }, []);


  if(transactionDto===undefined){
    return (
      <LoadingContainer/>
    )
  }

  return(

      <Container fluid>
        <Row>
          <Col>
            <Table responsive className="p-5 justify-content-center table-horizontal-only">
              <thead>
              <tr>
                <th className="justify-content-center"><strong>Transaction Status: </strong></th>
                <td><strong>{transactionDto.status}</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th></th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              </thead>
              <tbody>
              {
                transactionDto && !isLoading &&
                transactionDto.items.map((transactionProduct:TransactionProduct)=>(
                  <TransactionTableItem transactionProduct={transactionProduct}/>))
              }
              </tbody>
              <tfoot>
              <tr className="total-row" >
                <td colSpan={4}></td>
                <td className="justify-content-center border-top"><strong>Total: </strong></td>
                <td>
                  <strong>
                    ${transactionDto && transactionDto.total.toLocaleString()}
                  </strong>
                </td>
              </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12}>
            <div className="d-flex justify-content-center">
              <Form className="my-3 p-3 border border-dark rounded  vw-100">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label>
                    Select your payment method:
                  </Form.Label>
                    <Form.Select
                      value={payment}
                      onChange={(event)=> {
                        handleSelectPayment(event.target.value);
                      }}
                    >
                      <option value="visaMaster">Visa / Mastercard</option>
                      <option value="payPal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </Form.Select>
                    <Button
                      className="my-3"
                      style={{width: "100%"}}
                      onClick={handleTransaction}>
                      <FontAwesomeIcon icon={faSquareCaretRight} />
                    </Button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
  )
}