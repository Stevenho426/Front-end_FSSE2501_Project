import {Button, Stack} from "react-bootstrap";
import mockData from "../response.json"
import QuantitySelector from "../../../component/QuantitySelector";
import {useEffect, useState} from "react";
import type {GetProductByPidDto} from "../../../../data/GetProductByPidDto.ts";
import * as ProductApi from "../../../../api/ProductApi.tsx"
import {useNavigate} from "@tanstack/react-router";

type Props = {
  pid:string;
}

export default function ProductDetailContainer ({pid}:Props) {

  const [getProductByPidDto, setGetProductByPidDto] = useState<GetProductByPidDto|undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate({from: '/product/$productId'})

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
    try{
      setIsLoading(true);
      const responseData = await ProductApi.getProductByPid(pid);
      setGetProductByPidDto(responseData);
      setIsLoading(false);
    }catch {
      navigate({to: '/error'});
    }
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
      <div className="d-flex">
        <
          QuantitySelector
          handleQuantityMinusOne={handleQuantityMinusOne}
          handleQuantityPlusOne={handleQuantityPlusOne}
          quantity={quantity}
        />
        <Button className="mx-3 p-2">Add to Cart</Button>
      </div>
      <div className="p-2">
        Stock Status: {getProductByPidDto.stock}
      </div>
    </Stack>
    ))

}