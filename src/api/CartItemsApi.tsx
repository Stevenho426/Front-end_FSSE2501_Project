import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";

export async function putCartItem(pid:string, quantity:number) {

  const baseUrl="http://localhost:8080";

  await axios.put<void>(
    `${baseUrl}/cart/items/${pid}/${quantity}`,
    null,
    await getAuthConfig()
)

  
}