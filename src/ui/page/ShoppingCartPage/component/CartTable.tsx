import type {GetCartItemsDto} from "../../../../data/GetCartItemsDto.ts";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx"
import {useContext, useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import CartTableItem from "./CartTableItem.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import {LoginUserContext} from "../../../../../context/loginUserContext.ts";
import {useNavigate} from "@tanstack/react-router";

export default function CartTable () {

  const [cartItemsDtoList, setCartItemsDtoList] = useState<GetCartItemsDto[]|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({from:"/shoppingcart"})
  const [isDeletedCartItem, setIsDeletedCartItem] = useState(false);
  const [isUpdatedCartItem, setIsUpdatedCartItem] = useState(false);


  const totalAmount = cartItemsDtoList?.reduce((sum:number, cartItem:GetCartItemsDto) =>
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
            cartItemsDtoList.map((cartItem:GetCartItemsDto)=>(
              <CartTableItem
                cartItemDto={cartItem}
                setIsDeletedCartItem={setIsDeletedCartItem}
                setIsUpdatedCartItem={setIsUpdatedCartItem}
              />
              )
            )

          ) : (
            <Row>
              {
                Array.from({length:4}).map(()=> (
                  <Col sm={6} md={4} lg={3} className="mb-4">
                    <LoadingContainer/>
                  </Col>
                ))}
            </Row>
          )
        }
        </tbody>
        {
          cartItemsDtoList && !isLoading? (
            <tr className="total-row" >
              <td colSpan={5}></td>
              <td className="justify-content-center border-top"><strong>Total: </strong></td>
              <td>
                <strong>
                  ${totalAmount.toLocaleString()}
                </strong>
              </td>
            </tr>
          ) : (
            <Row>
              {
              Array.from({length:4}).map(()=> (
                <Col sm={6} md={4} lg={3} className="mb-4">
                  <LoadingContainer/>
                </Col>
              ))}
            </Row>

          )
        }

      </Table>
    </Container>

  )
}