import {Button, ButtonGroup} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import type {GetProductByPidDtoType} from "../../../../data/GetProductByPidDto.type.ts";
import * as ProductApi from "../../../../api/ProductApi.tsx"
import {useNavigate} from "@tanstack/react-router";
import {LoginUserContext} from "../../../../../context/LoginUserContext.ts";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx";
import type {GetCartItemsDtoType} from "../../../../data/GetCartItemsDto.type.ts";
import {CartItemContext} from "../../../../../context/CartItemContext.tsx";

type Props = {
  pid:string;
}

export default function ProductDetailContainer ({pid}:Props) {

  const loginUser = useContext(LoginUserContext);
  const cartItemContext = useContext(CartItemContext);

  const [getProductByPidDto, setGetProductByPidDto] = useState<GetProductByPidDtoType|undefined>(undefined);
  const [currCartItem, setCurrCartItem] = useState<GetCartItemsDtoType|undefined>(undefined)
  const [isInCart, setIsInCart] = useState(false);

  const checkIsInCart = ()=>{

    console.log(cartItemContext.cartItemList);
    if (cartItemContext.cartItemList.length>0){
      console.log("typeof pid prop:", typeof pid, pid);
      console.log("typeof context cart pid:", typeof cartItemContext.cartItemList[0].pid, cartItemContext.cartItemList[0].pid);

      const tempCurrCartItem=cartItemContext.cartItemList.find((cartItem:GetCartItemsDtoType)=>Number(cartItem.pid)===Number(pid));
      console.log(`tempCurrCartItem is: ${tempCurrCartItem}`);
      if(tempCurrCartItem){
        setIsInCart(true);
        setCurrCartItem(tempCurrCartItem);
        setQuantity(tempCurrCartItem.cartQuantity);
      }
    }else {
      console.log(`no matches found`);
      setQuantity(0);
    }
  }
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatedQty, setIsUpdatedQty] = useState(false);
  const navigate = useNavigate({from: '/product/$productId'})

  const handleQuantityMinusOne = async ()=>{

    try{
      let updatedQuantity: number | undefined;

      if(currCartItem && currCartItem.cartQuantity>1){
        updatedQuantity = currCartItem.cartQuantity-1;
        setIsUpdatedQty(true);
        setIsAddingToCart(true);
        setQuantity(updatedQuantity);
        setIsUpdatedQty(false);
        setTimeout(()=>{
          setIsAddingToCart(false)
        }, 1200)
      } else if (currCartItem && currCartItem.cartQuantity===1){
        updatedQuantity=0;
        setIsUpdatedQty(true);
        setIsAddingToCart(true);
        setQuantity(updatedQuantity);
        setIsInCart(false);
        setIsUpdatedQty(false);
        setTimeout(()=>{
          setIsAddingToCart(false)
        }, 1200)
      } else{
        updatedQuantity=0;
      }
      await CartItemsApi.updateCartQuantity(pid, updatedQuantity);
      const responseData = await CartItemsApi.getCartItemsDtoList();
      cartItemContext.setCartItemListContext(responseData);
    }catch{
      navigate({to: "/error"});
    }
  }

  const handleQuantityPlusOne = async ()=>{

    try{
      if(currCartItem && quantity<currCartItem.stock){
        const updatedQuantity = currCartItem.cartQuantity+1;
        setQuantity(updatedQuantity);
        setIsUpdatedQty(true);
        setIsAddingToCart(true);
        await CartItemsApi.updateCartQuantity(pid, updatedQuantity);
        const responseData = await CartItemsApi.getCartItemsDtoList();
        cartItemContext.setCartItemListContext(responseData);
        setIsUpdatedQty(false);
        setTimeout(()=>{
          setIsAddingToCart(false)
        }, 1200)
        console.log(`currCartItem qty is: ${currCartItem.cartQuantity}`);
      }
    }catch{
      navigate({to: "/error"});
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
        await CartItemsApi.putCartItem(pid, 1);
        const responseData = await CartItemsApi.getCartItemsDtoList();
        cartItemContext.setCartItemListContext(responseData);
        setIsInCart(true);
        setIsAddingToCart(false);

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

  useEffect(() => {
    checkIsInCart();
  }, [checkIsInCart, isUpdatedQty]);

  return (
    (
      getProductByPidDto  && !isLoading &&
    <div className="d-flex flex-column justify-content-center mt-3" >

        <img
          style={{height: "200px", objectFit: "contain"}}
          src={getProductByPidDto.imageUrl}
        />

      <div className="d-flex p-2 justify-content-center">
        <h1>{getProductByPidDto.name}</h1>
      </div>
      <div className="d-flex p-2 justify-content-center">
        {getProductByPidDto.description}
      </div>
      <div className="d-flex p-2 justify-content-center">
        Price: ${getProductByPidDto.price.toLocaleString()}
      </div>
      <div className="d-flex justify-content-center align-items-baseline">
        {
          !isInCart ? (
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              Add to Shopping Cart
            </Button>
            ) : (
            <div className="d-flex justify-content-center flex-column">
              <ButtonGroup>
                <Button
                  onClick={handleQuantityMinusOne}
                  variant="primary"
                  disabled={isAddingToCart}
                >
                  -
                </Button>
                <Button variant="primary">{currCartItem?.cartQuantity}</Button>
                <Button
                  onClick={handleQuantityPlusOne}
                  variant="primary"
                  disabled={isAddingToCart}
                >
                  +
                </Button>
              </ButtonGroup>
            </div>
          )
        }
      </div>
      <div className="d-flex justify-content-center p-2">
        {
          `Stock Status: ${getProductByPidDto.stock}`
        }
      </div>
    </div>
    ))
}