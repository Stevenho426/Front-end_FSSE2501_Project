import type {GetCartItemsDtoType} from "../../../../data/GetCartItemsDto.type.ts";
import QuantitySelector from "../../../component/QuantitySelector";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import * as CartItemsApi from "../../../../api/CartItemsApi.tsx"
import {Button} from "react-bootstrap";
import {useNavigate} from "@tanstack/react-router";

type Props  = {
  cartItemDto: GetCartItemsDtoType;
  setIsDeletedCartItem: (deleted: boolean)=>void;
  setIsUpdatedCartItem: (updated: boolean)=>void;
}

export default function CartTableItem ({cartItemDto, setIsDeletedCartItem, setIsUpdatedCartItem}:Props) {

  const [quantity, setQuantity] = useState<number>(cartItemDto.cartQuantity);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [isDeletingCartItem, setIsDeletingCartItem] = useState(false);
  const [subTotal, setSubTotal] = useState(cartItemDto.price*cartItemDto.cartQuantity);
  const navigate = useNavigate({from: "/shoppingcart"})

  const handleQuantityMinusOne = async ()=>{

    try{
      if(quantity>1){
        setIsUpdatingCart(true);
        const updatedQty=quantity-1;
        const updatedSubtotal = cartItemDto.price*updatedQty;
        setQuantity(updatedQty);
        setSubTotal(updatedSubtotal);
        await CartItemsApi.updateCartQuantity(cartItemDto.pid, updatedQty);
        setIsUpdatingCart(false);
        setIsUpdatedCartItem(true);
      } else{
        handleRemoveCartItem();
      }
    }catch{
      navigate({to: "/error"});
    }
  }

  const handleQuantityPlusOne = async ()=>{

    try{
      if(quantity<cartItemDto.stock){
        setIsUpdatingCart(true);
        const updatedQty=quantity+1;
        const updatedSubtotal = cartItemDto.price*updatedQty;
        setQuantity(updatedQty);
        setSubTotal(updatedSubtotal);
        await CartItemsApi.updateCartQuantity(cartItemDto.pid, updatedQty);
        setIsUpdatingCart(false);
        setIsUpdatedCartItem(true);
      }
    }catch{
      navigate({to: "/error"});
    }
  }

  const handleRemoveCartItem = async ()=>{
    try{
      setIsDeletingCartItem(true);
      await CartItemsApi.removeCartItem(cartItemDto.pid);
      setIsDeletingCartItem(false);
      setIsDeletedCartItem(true);
    }catch{
      navigate({to: "/error"});
    }
  }


  return(
    <tr className="normal-row">
      <td>
        <img
          src={cartItemDto.imageUrl}
          style={{width: "100px" , height: "100px"}}
        />
      </td>
      <td>{cartItemDto.pid}</td>
      <td>{cartItemDto.name}</td>
      <td>${cartItemDto.price.toLocaleString()}</td>
      <td>
      <QuantitySelector
        handleQuantityMinusOne={handleQuantityMinusOne}
        handleQuantityPlusOne={handleQuantityPlusOne}
        quantity={quantity}
        isUpdatingCart={isUpdatingCart}
      />
      </td>
      <td>${subTotal.toLocaleString()}</td>
      <td>
        <Button variant="danger" onClick={handleRemoveCartItem} disabled={isDeletingCartItem}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  )

}