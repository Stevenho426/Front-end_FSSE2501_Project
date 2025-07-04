import { Container,Table} from "react-bootstrap";
import TransactionTableItem from "./TransactionTableItem.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import type {TransactionDto, TransactionProduct} from "../../../../data/TransactionProduct.type.ts";
import { useEffect, useState} from "react";
import * as TransactionApi from "../../../../api/TransactionApi.tsx";
import {useNavigate} from "@tanstack/react-router";
import * as React from "react";

type Props = {
  tid: string;
}

export default function TransactionTable ({tid}:Props):React.JSX.Element {

  const [transactionDto, setTransactionDto] = useState<TransactionDto|undefined>(undefined);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const getTransactionDetailsById = async ()=> {

    try {
      setIsLoading(true);
      const responseData = await TransactionApi.getTransactionDetailsById(tid);

      if (responseData &&
        Array.isArray(responseData.transactionProductList)
        && typeof responseData === "number") {
        setTransactionDto(responseData);
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTransactionDetailsById();
  }, []);

  useEffect(() => {
    if (hasError || !transactionDto) {
      navigate({ to: "/error" });
    }
  }, []);

  if(isLoading || transactionDto===undefined){
    return (
      <LoadingContainer/>
    )
  } else if(transactionDto===null){
      navigate({to:"/login"});
    }

  return(

    <Container>
      <Table responsive className="p-3 justify-content-center table-horizontal-only">
        <thead>
        <tr>
          <th colSpan={7} className="justify-content-center">Summary</th>
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
          transactionDto.transactionProductList.map((transactionProduct:TransactionProduct)=>(
            <TransactionTableItem transactionProduct={transactionProduct}/>))
        }
        </tbody>
          <tr className="total-row" >
            <td colSpan={4}></td>
            <td className="justify-content-center border-top"><strong>Total: </strong></td>
            <td>
              <strong>
                ${transactionDto.total.toLocaleString()}
              </strong>
            </td>
          </tr>
      </Table>
    </Container>
  )
}