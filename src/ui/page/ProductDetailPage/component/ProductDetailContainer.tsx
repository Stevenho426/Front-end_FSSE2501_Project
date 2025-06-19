import {Stack} from "react-bootstrap";
import mockData from "../response.json"
import QuantitySelector from "../../../component/QuantitySelector";
import {useEffect, useState} from "react";
import type {GetProductByPidDto} from "../../../../data/GetProductByPidDto.ts";
import * as ProductApi from "../../../../api/ProductApi.tsx"

type Props = {
  pid:string;
}

export default function ProductDetailContainer ({pid}:Props) {

  const [getProductByPidDto, setGetProductByPidDto] = useState<GetProductByPidDto|undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityMinusOne = ()=>{
    if(quantity>1){
      setQuantity(quantity-1);
    }
  }

  const handleQuantityPlusOne = ()=>{
    if(quantity<mockData.stock){
      setQuantity(quantity+1);
    }
  }

  const getProductByPid = async ()=>{
    setIsLoading(true);
    const responseData = await ProductApi.getProductByPid(pid);
    setGetProductByPidDto(responseData);
    setIsLoading(false);
  }

  useEffect(() => {
      getProductByPid();

  }, []);

  return (
    (
      getProductByPidDto  && !isLoading &&
    <Stack gap={3}>
      <div>
        <img src={getProductByPidDto.imageUrl}/>
      </div>
      <div className="p-2">
        <h1>{getProductByPidDto.name}</h1>
      </div>
      <div className="p-2">
        {getProductByPidDto.description}
      </div>
      <div className="p-2">
        Price: ${getProductByPidDto.price.toLocaleString()}
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
        {getProductByPidDto.stock}
      </div>
    </Stack>
    ))

}