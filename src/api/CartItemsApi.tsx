import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";
import type {GetCartItemsDtoType} from "../data/GetCartItemsDto.type.ts";
import getEnvConfig from "../config/env/EnvConfig.ts";

const baseUrl=getEnvConfig().baseUrl;

export async function putCartItem(pid:string, quantity:number) {

  try {
    await axios.put<void>(
      `${baseUrl}/cart/items/${pid}/${quantity}`,
      null,
      await getAuthConfig()
    )
  }catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getCartItemsDtoList() {

  try {
    const response = await axios.get<GetCartItemsDtoType[]>(
      `${baseUrl}/cart/items`,
      await getAuthConfig()
    )
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateCartQuantity(pid:string, quantity:number){

  try{
    await axios.patch<void>(
      `${baseUrl}/cart/items/${pid}/${quantity}`,
      null,
      await getAuthConfig()
    )
  }catch (e) {
    console.log(e);
    throw e;
  }
}

export async function removeCartItem(pid:string){

  try{
    await axios.delete<void>(
      `${baseUrl}/cart/items/${pid}`,
      await getAuthConfig()
    )
  }catch (e) {
    console.log(e);
    throw e;
  }
}