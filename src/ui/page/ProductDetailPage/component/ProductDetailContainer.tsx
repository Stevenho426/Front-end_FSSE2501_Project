import {Stack} from "react-bootstrap";
import mockData from "../response.json"
import QuantitySelector from "../../../component/QuantitySelector";
import {useState} from "react";


export default function ProductDetailContainer () {

  const [quantity, setQuantity] = useState(1);

  const handleQuantityMinusOne = ()=>{
    if(quantity>0){
      setQuantity(quantity-1);
    }
  }

  const handleQuantityPlusOne = ()=>{
    if(quantity<mockData.stock){
      setQuantity(quantity+1);
    }
  }

  return (

    <Stack gap={3}>
      <div>
        <img src={mockData.imageUrl}/>
      </div>
      <div className="p-2">
        <h1>{mockData.name}</h1>
      </div>
      <div className="p-2">
        {mockData.description}
      </div>
      <div className="p-2">
       Price: ${mockData.price.toLocaleString()}
      </div>
      <div>
        <
          QuantitySelector
          handleQuantityMinusOne={handleQuantityMinusOne}
          handleQuantityPlusOne={handleQuantityPlusOne}
          quantity={quantity}
        />
      </div>
      <div className="p-2">
        {mockData.stock}
      </div>

    </Stack>


  )
}