import {Button} from "react-bootstrap";

type Props = {
  handleQuantityMinusOne:()=>void;
  handleQuantityPlusOne:()=>void;
  quantity:number|undefined;
  isUpdatingCart?:boolean
}

export default function QuantitySelector ({handleQuantityMinusOne, handleQuantityPlusOne, quantity, isUpdatingCart}:Props) {


  return (

      <div className="d-flex quantity-selector align-items-baseline" >
        <Button disabled={isUpdatingCart} onClick={handleQuantityMinusOne} className="decrease mx-1">-</Button>
        <div className="quantity mx-1 p-1" defaultValue={1}>
          <div >
            {quantity}
          </div>
        </div>
        <Button disabled={isUpdatingCart} onClick={handleQuantityPlusOne} className="increase mx-1">+</Button>
      </div>

  )
}