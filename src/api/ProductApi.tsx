import axios from "axios";
import type {GetAllProductDto} from "../data/GetAllProductDto.ts";
import type {GetProductByPidDto} from "../data/GetProductByPidDto.ts";

const baseUrl = "http://localhost:8080/"

export async function getAllProduct() {

  try{
    const response = await axios.get<GetAllProductDto[]>(
      `${baseUrl}public/products`);

      return response.data;
  }catch (e) {
    console.log("Error fetching product details: ", e);
    throw e;
  }

}

export async function getProductByPid(pid:string) {

  try{

    const response = await axios.get<GetProductByPidDto>(
      `${baseUrl}public/products/${pid}`);

      return response.data;
  }catch (e){
    console.log("Error fetching product details: ", e);
    throw e;
  }
}