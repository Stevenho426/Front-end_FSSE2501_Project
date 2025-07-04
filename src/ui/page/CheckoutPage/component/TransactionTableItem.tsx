import type {TransactionProduct} from "../../../../data/TransactionProduct.type.ts";

type Props  = {
  transactionProduct:TransactionProduct;
}

export default function TransactionTableItem ({transactionProduct}:Props) {


  return(
    <tr className="normal-row">
      <td>
        <img src={transactionProduct.product.imageUrl}/>
      </td>
      <td>{transactionProduct.product.pid}</td>
      <td>{transactionProduct.product.name}</td>
      <td>${transactionProduct.product.price.toLocaleString()}</td>
      <td>Quantity: {transactionProduct.quantity}</td>
      <td>${transactionProduct.subtotal.toLocaleString()}</td>
    </tr>
  )

}