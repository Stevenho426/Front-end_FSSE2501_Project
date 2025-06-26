import {Link} from "@tanstack/react-router";
import {Container, Nav, Navbar, NavItem} from "react-bootstrap";

export default function TopNavbar() {
  return (

    <Navbar bg="secondary gradient" data-bs-theme="dark">
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
          <NavItem>
            <Link to='/' className="text-white p-4 align-bottom text-decoration-none">
              Shopping Cart
            </Link>
          </NavItem>
          <NavItem>
            <
              Link to='/login'
                   className="text-white p-4 align-bottom text-decoration-none justify-content-end"
            >
              Login
            </Link>
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