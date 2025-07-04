import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";
import type {TransactionDto} from "../data/TransactionProduct.type.ts";

const baseUrl = "http://localhost:8080";

export async function createNewTransaction() {

  const response = await axios.post<TransactionDto>(
    `${baseUrl}/transactions`,
    null,
    await getAuthConfig()
  )

  return response.data
  
}

export async function getTransactionDetailsById(tid: string){

  const response = await axios.get<TransactionDto>(
    `${baseUrl}/transactions/${tid}`,
    await getAuthConfig()
  )

  return response.data
}