import {Button, Card} from "react-bootstrap";
import type {GetAllProductDto} from "../../../../data/GetAllProductDto.ts";
import {Link} from "@tanstack/react-router";

type Props ={
  getAllProductDto:GetAllProductDto;
}

export default function ProductCard ({getAllProductDto}:Props) {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={getAllProductDto.imageUrl} height='300'/>
      <Card.Body>
        <Card.Title>{getAllProductDto.name}</Card.Title>
        <Card.Text>
          Price: ${getAllProductDto.price.toLocaleString()} <br/>
          {getAllProductDto.hasStock?"Stock Available":"Out of Stock"}
        </Card.Text>
        <Link
          to="/product/$productId"
          params={{
            productId: getAllProductDto.pid.toString()
          }}>
        <Button variant="primary">Go somewhere</Button>
        </Link>
      </Card.Body>
    </Card>
  )

}