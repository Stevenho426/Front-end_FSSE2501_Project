import axios from "axios";
import type {GetAllProductDto} from "../data/GetAllProductDto.ts";
import type {GetProductByPidDto} from "../data/GetProductByPidDto.ts";

const baseUrl = "http://localhost:8080/"

export async function getAllProduct() {

  const response = await axios.get<GetAllProductDto[]>(
    `${baseUrl}public/products`);

    return response.data;

}

export async function getProductByPid(pid:string) {

  const response = await axios.get<GetProductByPidDto>(
    `${baseUrl}public/products/${pid}`);

    return response.data;

}