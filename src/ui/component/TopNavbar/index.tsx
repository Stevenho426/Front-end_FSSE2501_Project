import {Link} from "@tanstack/react-router";
import {Button, Container, Nav, Navbar, NavItem} from "react-bootstrap";
import {useContext} from "react";
import {LoginUserContext} from "../../../../context/loginUserContext.ts";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

export default function TopNavbar() {

  const loginUser = useContext(LoginUserContext);

  const handleLogout = async ()=>{
    await FirebaseAuthService.signOut();
  }

  const renderLoginButton = ()=>{
    if(loginUser) {
      return (
        <div className="d-flex align-items-baseline">
          <div className="mx-1">
            <Button>
              <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} />
            </Button>
          </div>
          <div className="mx-1 text-white">
            {loginUser?.email}
          </div>
          <div className="mx-1">
            <Button onClick={handleLogout}>
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
          <
            Link to='/login'
                 className="text-white p-4 align-bottom text-decoration-none "
          >
            Login
          </Link>
          )
      }
    }

  return (

    <Navbar bg="secondary gradient" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand >
          <Link to='/' className="text-white p-4 align-bottom text-decoration-none">
            Online Shop
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavItem >
            <Link to='/' className="text-white p-4 align-bottom text-decoration-none">
              Product
            </Link>
          </NavItem>
        </Nav>
        <Nav >
          <NavItem className="ms-auto justify-content-end">
            {renderLoginButton()}
          </NavItem>
        </Nav>
      </Container>
    </Navbar>


    // <Navbar bg="secondary gradient" data-bs-theme="dark" className="p-4">
    //   <Navbar.Brand >
    //     <Link to='/' className="text-white ">Home</Link>
    //   </Navbar.Brand>
    //   <NavItem>
    //     <Link to='/' className="text-white">Product</Link>
    //   </NavItem>
    //   <NavItem>
    //     <Link to='/' className="text-white">Shopping Cart</Link>
    //   </NavItem>
    //   <NavItem>
    //     <Link to='/login' className={"text-white"}>Login</Link>
    //   </NavItem>
    // </Navbar>

    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">
    //         Product Listing Page
    //       </Link>
    //     </li>
    //     <li>
    //       <Link
    //         to="/product/$productId/$userId"
    //         params={{
    //           productId: "1",
    //           userId: "1"
    //         }}
    //       >
    //         Product Detail Page
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/shoppingcart">Shopping Cart Page</Link>
    //     </li>
    //     <li>
    //       <Link
    //         to="/checkout/$transactionId"
    //         params={{
    //           transactionId: "1"
    //         }}
    //       >
    //         Checkout Page
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/thankyou">Thank You Page</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}