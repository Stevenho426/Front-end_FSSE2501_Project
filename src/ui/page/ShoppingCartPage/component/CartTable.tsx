import type {GetCartItemsDtoType} from "../../../../data/GetCartItemsDto.type.ts";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx"
import {useContext, useEffect, useState} from "react";
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import CartTableItem from "./CartTableItem.tsx";
import LoadingContainer from "../../../component/LoadingContainer";
import {LoginUserContext} from "../../../../../context/LoginUserContext.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";
import * as TransactionApi from "../../../../api/TransactionApi.tsx"
import {CartItemContext} from "../../../../../context/CartItemContext.tsx";



export default function CartTable () {

  const [cartItemsDtoList, setCartItemsDtoList] = useState<GetCartItemsDtoType[]|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useContext(LoginUserContext);
  const navigate = useNavigate({from: "/shoppingcart"});
  const [isDeletedCartItem, setIsDeletedCartItem] = useState(false);
  const [isUpdatedCartItem, setIsUpdatedCartItem] = useState(false);
  const cartContext = useContext(CartItemContext);


  const totalAmount = cartItemsDtoList?.reduce((sum:number, cartItem:GetCartItemsDtoType) =>
    sum + cartItem.cartQuantity * cartItem.price, 0) ?? 0;


  const getCartItemsDtoList = async ()=>{

    try{
      if(loginUser){
        setIsLoading(true);
        const responseData = await CartItemsApi.getCartItemsDtoList();
        setCartItemsDtoList(responseData);
        cartContext.setCartItemListContext(responseData);
        setIsLoading(false);
      } else {
        navigate({to: "/login"});
      }
    }catch{
      navigate({to: "/error"});
    }
  }

  const handleCreateNewTransaction = async ()=>{
    try {
      if(loginUser) {
        setIsLoading(true);
        const responseData = await TransactionApi.createNewTransaction();
        setIsLoading(false);
        navigate({
          to: "/checkout/$transactionId",
          params: {transactionId: responseData.tid.toString()}
        })
      }
    }catch (error){
      console.log(error);
      navigate({to: "/error"});
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

  if(cartItemsDtoList?.length===0){

    return (
      <Container>
        <Row>
          <Col className="text-center">
            <Image
              src="https://t4.ftcdn.net/jpg/01/67/44/09/360_F_167440913_ai5ZyrlREVCvAwYvT04cJ8R2Ctwe6EUW.jpg"
              width="35%"
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to = "/"
                  className="justify-content-center text-decoration-none text-black"
            >
              Your cart is empty. Go to shopping now!  <FontAwesomeIcon icon={faArrowRight} beat size="lg" /></Link>
          </Col>
        </Row>


      </Container>
    )
  }

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
                <td colSpan={2}>
                  <Button onClick={handleCreateNewTransaction} size={"lg"}>
                    <FontAwesomeIcon icon={faMoneyCheckDollar} size="xl" />
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