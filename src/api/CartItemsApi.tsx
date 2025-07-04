import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";
import type {GetCartItemsDtoType} from "../data/GetCartItemsDto.type.ts";

const baseUrl="http://localhost:8080";

export async function putCartItem(pid:string, quantity:number) {

  await axios.put<void>(
    `${baseUrl}/cart/items/${pid}/${quantity}`,
    null,
    await getAuthConfig()
  )
}

export async function getCartItemsDtoList() {

  const response = await axios.get<GetCartItemsDtoType[]>(
    `${baseUrl}/cart/items`,
    await getAuthConfig()
  )
  return response.data;
}

export async function updateCartQuantity(pid:string, quantity:number){

  await axios.patch<void>(
    `${baseUrl}/cart/items/${pid}/${quantity}`,
    null,
    await getAuthConfig()
  )
}

export async function removeCartItem(pid:string){

  await axios.delete<void>(
    `${baseUrl}/cart/items/${pid}`,
    await getAuthConfig()
  )
}