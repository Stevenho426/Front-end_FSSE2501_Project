import {Button, Container, Form} from "react-bootstrap";
import TopNavbar from "../../component/TopNavbar";
import {useState} from "react";

export default function LoginPage() {

  const [email, setUserId] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);
    return(
      <div className="login-page-container">
        <TopNavbar/>
          <Container>
            <Form className="my-5">
              <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
      </div>
    );
}