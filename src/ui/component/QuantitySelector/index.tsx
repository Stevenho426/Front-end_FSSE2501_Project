type Props = {
  handleQuantityMinusOne:()=>void;
  handleQuantityPlusOne:()=>void;
  quantity:number;
}

export default function QuantitySelector ({handleQuantityMinusOne, handleQuantityPlusOne, quantity}:Props) {


  return (

      <div className="d-flex quantity-selector" >
        <button onClick={handleQuantityMinusOne} className="decrease">--</button>
        <input type="number" className="quantity" defaultValue={1} min={1}>
          {quantity}
        </input>
        <button onClick={handleQuantityPlusOne} className="increase">++</button>
      </div>

  )
}