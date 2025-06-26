import {Button} from "react-bootstrap";

type Props = {
  handleQuantityMinusOne:()=>void;
  handleQuantityPlusOne:()=>void;
  quantity:number;
}

export default function QuantitySelector ({handleQuantityMinusOne, handleQuantityPlusOne, quantity}:Props) {


  return (

      <div className="d-flex quantity-selector" >
        <Button onClick={handleQuantityMinusOne} className="decrease mx-1">-</Button>
        <div className="quantity mx-1 p-1" defaultValue={1}>
          {quantity}
        </div>
        <Button onClick={handleQuantityPlusOne} className="increase mx-1">+</Button>
      </div>

  )
}