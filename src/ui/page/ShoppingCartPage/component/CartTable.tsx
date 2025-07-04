import type {GetCartItemsDtoType} from "../../../../data/GetCartItemsDto.type.ts";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx"
import {useContext, useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import CartTableItem from "./CartTableItem.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import {LoginUserContext} from "../../../../../context/loginUserContext.ts";
import {useNavigate} from "@tanstack/react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";
import * as TransactionApi from "../../../../api/TransactionApi.tsx"
import { Route as CheckoutRoute } from '../../../../routes/checkout/$transactionId';


export default function CartTable () {

  const [cartItemsDtoList, setCartItemsDtoList] = useState<GetCartItemsDtoType[]|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate();
  const [isDeletedCartItem, setIsDeletedCartItem] = useState(false);
  const [isUpdatedCartItem, setIsUpdatedCartItem] = useState(false);


  const totalAmount = cartItemsDtoList?.reduce((sum:number, cartItem:GetCartItemsDtoType) =>
    sum + cartItem.cartQuantity * cartItem.price, 0) ?? 0;


  const getCartItemsDtoList = async ()=>{

    if(loginUser){
      setIsLoading(true);
      const responseData = await CartItemsApi.getCartItemsDtoList();
      setCartItemsDtoList(responseData);
      setIsLoading(false);
    } else {
      navigate({to: "/login"});
    }
  }

  const handleCreateNewTransaction = async ()=>{
    try {
      if(loginUser) {
        setIsLoading(true);
        const responseData = await TransactionApi.createNewTransaction();
        setIsLoading(false);
        console.log('Navigating to checkout with tid:', responseData.tid.toString());
        console.log('Route to:', CheckoutRoute.path);
        navigate({
          to: CheckoutRoute.path,
          params: {transactionId: responseData.tid.toString()}
        })
      }
    }catch{
      navigate({to:"/error"});
    }

  }

  useEffect(() => {

    const getDtoList = async ()=>{

      await getCartItemsDtoList();
      setIsDeletedCartItem(false);
      setIsUpdatedCartItem(false);
    }

    getDtoList();

  }, [loginUser, isDeletedCartItem, isUpdatedCartItem]);

  return(

    <Container>
      <Table responsive className="p-3 justify-content-center table-horizontal-only">
        <thead>
        <tr>
          <th></th>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          cartItemsDtoList && !isLoading ? (
            cartItemsDtoList.map((cartItem:GetCartItemsDtoType)=>(
              <CartTableItem
                cartItemDto={cartItem}
                setIsDeletedCartItem={setIsDeletedCartItem}
                setIsUpdatedCartItem={setIsUpdatedCartItem}
              />
              )
            )

          ) : (
            <tr>
              <td colSpan={6}>
                <LoadingContainer />
              </td>
            </tr>
          )
        }
        </tbody>
        <tfoot>
        {
          cartItemsDtoList && !isLoading? (
            <>
              <tr className="total-row" >
                <td colSpan={5}></td>
                <td className="justify-content-center border-top"><strong>Total: </strong></td>
                <td>
                  <strong>
                    ${totalAmount.toLocaleString()}
                  </strong>
                </td>
              </tr>
              <tr>
                <td colSpan={5}></td>
                <td>
                  <Button onClick={handleCreateNewTransaction}>
                    <FontAwesomeIcon icon={faMoneyCheckDollar} size="lg" />
                  </Button>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan={6}>
                <LoadingContainer />
              </td>
            </tr>
          )
        }
        </tfoot>

      </Table>
    </Container>

  )
}