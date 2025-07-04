import {Button, Stack} from "react-bootstrap";
import mockData from "../response.json"
import QuantitySelector from "../../../component/QuantitySelector";
import {useContext, useEffect, useState} from "react";
import type {GetProductByPidDtoType} from "../../../../data/GetProductByPidDto.type.ts";
import * as ProductApi from "../../../../api/ProductApi.tsx"
import {useNavigate} from "@tanstack/react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {LoginUserContext} from "../../../../../context/loginUserContext.ts";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx";

type Props = {
  pid:string;
}

export default function ProductDetailContainer ({pid}:Props) {

  const [getProductByPidDto, setGetProductByPidDto] = useState<GetProductByPidDtoType|undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSuccessAddedToCart, setIsSuccessAddedToCart] = useState(false);
  const navigate = useNavigate({from: '/product/$productId'})

  const loginUser = useContext(LoginUserContext);

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

  const handleAddToCart = async ()=>{
    try{
      if(loginUser){
        setIsAddingToCart(true);
        await CartItemsApi.putCartItem(pid, quantity);
        setIsAddingToCart(false);
        setIsSuccessAddedToCart(true);

        setTimeout(()=>{
          setIsSuccessAddedToCart(false)
        }, 3600)
      } else if(loginUser===null){
        navigate({to:"/login"})
      }
    }catch {
      navigate({to:"/error"});
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
      <div className="d-flex align-items-baseline">
        <
          QuantitySelector
          handleQuantityMinusOne={handleQuantityMinusOne}
          handleQuantityPlusOne={handleQuantityPlusOne}
          quantity={quantity}
        />
        <div className="mx-3 p-2">
          {isSuccessAddedToCart ? (
            <Button
              variant="success"
              disabled
            >
              Added to Cart!
            </Button>
          ) : (
            <Button
              variant="danger"
              disabled={isAddingToCart}
              onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} />
            </Button>
          )

          }

        </div>
      </div>
      <div className="p-2">
        Stock Status: {getProductByPidDto.stock}
      </div>
    </Stack>
    ))

}