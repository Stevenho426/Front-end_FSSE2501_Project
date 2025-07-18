import axios from "axios";
import type {GetAllProductDtoType} from "../data/GetAllProductDto.type.ts";
import type {GetProductByPidDtoType} from "../data/GetProductByPidDto.type.ts";
import getEnvConfig from "../config/env/EnvConfig.ts";

const baseUrl=getEnvConfig().baseUrl;

export async function getAllProduct() {

  try{
    const response = await axios.get<GetAllProductDtoType[]>(
      `${baseUrl}/public/products`);

      return response.data;
  }catch (e) {
    console.log("Error fetching product details: ", e);
    throw e;
  }

}

export async function getProductByPid(pid:string) {

  try{
    const response = await axios.get<GetProductByPidDtoType>(
      `${baseUrl}public/products/${pid}`);

      return response.data;
  }catch (e){
    console.log("Error fetching product details: ", e);
    throw e;
  }
}