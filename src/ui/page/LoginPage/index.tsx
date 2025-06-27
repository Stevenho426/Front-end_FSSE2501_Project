import {Alert, Button, Container, Form} from "react-bootstrap";
import TopNavbar from "../../component/TopNavbar";
import {type FormEvent, useState} from "react";
import {GoogleLoginButton} from "react-social-login-buttons";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useRouter} from "@tanstack/react-router";

export default function LoginPage() {

  const [isLoginFailed, setisLoginFailed] = useState<boolean>(false);
  const router = useRouter();

  const handleSignInWithEmailAndPassword = async (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value;

    const loginResult= await FirebaseAuthService.signInWithEmailAndPassword(email, password);

    if(loginResult){
      router.history.back();
    }else {
      setisLoginFailed(true);
    }
  }
    return(
      <>
        <TopNavbar/>
          <Container>
            <div className="d-flex justify-content-center">
              <div className="border rounded p-3 my-5"
                   style={{width: "500px"}}
              >
                <Form onSubmit={handleSignInWithEmailAndPassword} className="my-5">
                  {
                    isLoginFailed &&
                  <Alert variant="danger">
                    Login Failed!
                  </Alert>
                  }
                  <Form.Group  controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="email"/>
                  </Form.Group>

                  <Form.Group  controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                  </Form.Group>
                  <Button className="my-3" style={{width:"100%"}} variant="primary" type="submit">
                    Login
                  </Button>
                  <hr/>
                  <GoogleLoginButton onClick={() => alert("Hello")} />
                </Form>
            </div>
          </div>
        </Container>

      </>
    );
}