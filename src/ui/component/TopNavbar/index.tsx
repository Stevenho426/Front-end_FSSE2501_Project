import {Link} from "@tanstack/react-router";
import {Badge, Button, Container, Nav, Navbar, NavItem, Offcanvas} from "react-bootstrap";
import {useContext, useState} from "react";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons";
import type {GetCartItemsDtoType} from "../../../data/GetCartItemsDto.type.ts";
import {CartItemContext} from "../../../../context/CartItemContext.tsx";
import MiniCart from "../../page/ProductDetailPage/component/MiniCart.tsx";

export default function TopNavbar() {

  const loginUser = useContext(LoginUserContext);
  const [show, setShow] = useState(false);
  const [miniCartShow, setMiniCartShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMiniCartClose = ()=>setMiniCartShow(false);
  const handleMiniCartShow = ()=>setMiniCartShow(true);
  const cartItemsContext = useContext(CartItemContext);


  const calTotalCartItemQty = () =>{

    console.log(cartItemsContext.cartItemList);

    return cartItemsContext.cartItemList.reduce((totalQty: number, cartItem: GetCartItemsDtoType) =>
      totalQty + cartItem.cartQuantity, 0) ?? 0;
  }

  const handleLogout = async ()=>{
    await FirebaseAuthService.signOut();
  }

  const renderLoginButton = ()=>{
    if(loginUser) {
      return (
        <div className="d-flex align-items-baseline ">
          <div className="mx-1 mt-auto">
            {/*<Link to={"/shoppingcart"}>*/}
              <Button
                onClick={handleMiniCartShow}
                variant={"outline-light"}
                className="rounded-circle hover"
              >
                <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff"}} size="lg"/>
                <Badge bg="danger">{calTotalCartItemQty()}</Badge>
              </Button>
              <MiniCart miniCartShow={miniCartShow} handleMiniCartClose={handleMiniCartClose}/>
            {/*</Link>*/}
          </div>
          <div className="mx-1 text-white d-flex flex-column">
            <FontAwesomeIcon icon={faUser} />
            <>{loginUser?.email}</>
          </div>
          <div className="mx-1 mt-auto">
            <Button
            variant={"outline-light"}
            className="rounded "
              onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )
    }else if (loginUser===undefined){
        return (
          <></>
        )
      } else {
        return (
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <
                Link to={"/login"}
                     className="text-white text-decoration-none justify-content-center "
              >
                <div className="d-flex justify-content-center">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="d-flex justify-content-center">
                  Login
                </div>

              </Link>
            </div>
          </div>

          )
      }
    }


  return (

    <Navbar bg="dark" data-bs-theme="dark"
            style={{fontFamily: "HelveticaNeue", fontSize:"15px", fontWeight:"300"}}
            className="align-items-baseline"
            sticky="top"
    >
      <Container>
        <Navbar.Brand
          className="p-2 mt-atuo"
        >
          <Link to='/' className="text-white text-decoration-none">
            Online Shop
          </Link>
        </Navbar.Brand>
        <Nav  className="me-auto mt-auto">
          <NavItem className="p-2 mt-2">
            <Link to='/'
                  className="text-white text-decoration-none"
                  style={{fontSize:"18px"}}
            >
              Product
            </Link>
          </NavItem>
          <NavItem className="p-2">
            <Button
              onClick={handleShow}
              className="text-white text-decoration-none"
              variant=""
              style={{fontSize:"18px"}}
            >
              About Us
            </Button>
            <Offcanvas show={show} onHide={handleClose} className="text-white bg-dark">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>About Us</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                This is a project of my bootcamp course. In this project, Java & Spring Boot
                are used for the backend while JavaScript & React + TypeScript are used for
                the frontend.
                Thank you for visiting my e-shop.
              </Offcanvas.Body>
            </Offcanvas>
          </NavItem>

        </Nav>
        <Nav >
          <NavItem className="ms-auto justify-content-end">
            {renderLoginButton()}
          </NavItem>
        </Nav>
      </Container>
    </Navbar>

  );
}