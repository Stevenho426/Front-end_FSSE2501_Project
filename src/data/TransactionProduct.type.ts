export interface TransactionDto {
  tid:      number;
  buyerUid: number;
  datetime: Date;
  status:   string;
  total:    number;
  items:    TransactionProduct[];
}

export interface TransactionProduct {
  tpid:     number;
  product:  Product;
  quantity: number;
  subtotal: number;
}

export interface Product {
  pid:         number;
  name:        string;
  description: string;
  imageUrl:    string;
  price:       number;
  stock:       number;
}
