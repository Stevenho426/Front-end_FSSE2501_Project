import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";
import type {TransactionDto} from "../data/TransactionProduct.type.ts";


const baseUrl = "http://localhost:8080";

export async function createNewTransaction() {

  try{
    const response = await axios.post<TransactionDto>(
      `${baseUrl}/transactions`,
      null,
      await getAuthConfig()
    )
    return response.data;
  }catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getTransactionDetailsById(tid: string){

  try{
    const response = await axios.get<TransactionDto>(
      `${baseUrl}/transactions/${tid}`,
      await getAuthConfig()
    )
    return response.data;
  }catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateTransactionStatus(tid: string){

  try{
    await axios.patch(
      `${baseUrl}/transactions/${tid}/payment`,
      null,
      await getAuthConfig()
    )
  }catch (e) {
    console.log(e);
    throw e;
  }
}

export async function finishTransaction (tid: string){

  try {
    const response = await axios.patch<TransactionDto>(
      `${baseUrl}/transactions/${tid}/success`,
      null,
      await getAuthConfig()
    )
    return response.data;
  }catch (e) {
    console.log(e);
    throw e;
  }
}