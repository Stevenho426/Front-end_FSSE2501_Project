import {Col, Container, Offcanvas, Row} from "react-bootstrap";
import {useContext} from "react";
import {CartItemContext} from "../../../../../context/CartItemContext.tsx";
import type {GetCartItemsDtoType} from "../../../../data/GetCartItemsDto.type.ts";
import {Link} from "@tanstack/react-router";

type Props ={
  miniCartShow: boolean;
  handleMiniCartClose: (show: boolean)=>void;
}

export default function MiniCart ({miniCartShow, handleMiniCartClose}:Props) {

  const cartItemContext = useContext(CartItemContext);
  const {cartItemList} = cartItemContext;

  const total = cartItemList.reduce((sum: number, cartItem: GetCartItemsDtoType)=>
    sum + cartItem.price*cartItem.cartQuantity,0)?? 0;


  return (

    <Container>
      <Offcanvas show={miniCartShow} onHide={handleMiniCartClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >Shopping Cart Summary</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          { cartItemList &&
            <Row className="border-bottom">
              <Col md={4}>Product</Col>
              <Col md={2}>Qty</Col>
              <Col md={3}>Price</Col>
              <Col md={3}>Subtotal</Col>
            </Row>
          }
          {
            cartItemList.map((cartItem:GetCartItemsDtoType)=>(
              <Row className="mb-2 pb-2 border-bottom">
                <Col md={4}>{cartItem.name}</Col>
                <Col md={2}>{cartItem.cartQuantity}</Col>
                <Col md={3}>${cartItem.price.toFixed(2)}</Col>
                <Col md={3}>${(cartItem.cartQuantity * cartItem.price).toFixed(2)}</Col>
              </Row>
            ))
          }
          <Row>
            <Col md={7}></Col>
            <Col md={2}>Total: </Col>
            <Col md={3}>${total.toFixed(2)}</Col>
          </Row>
          <Row className="mt-5">
            <Col md={7}></Col>
            <Col>
              <Link to={"/shoppingcart"} className="text-black">Check out now!</Link>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>


  )

}