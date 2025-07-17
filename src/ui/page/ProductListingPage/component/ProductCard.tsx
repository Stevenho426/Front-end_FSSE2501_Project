import {Button, Card} from "react-bootstrap";
import type {GetAllProductDtoType} from "../../../../data/GetAllProductDto.type.ts";
import {Link} from "@tanstack/react-router";

type Props ={
  getAllProductDto:GetAllProductDtoType;
  pid:string;
}

export default function ProductCard ({getAllProductDto}:Props) {

  return (
    <Card className="justify-content-center border-light">
      <Card.Img variant="top" src={getAllProductDto.imageUrl} style={{height: "200px", objectFit: "contain"}}/>
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
        <Button variant="primary">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  )

}