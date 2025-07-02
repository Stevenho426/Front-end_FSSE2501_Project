export interface GetCartItemsDto {
  pid: string;
  name: string;
  imageUrl: string;
  price: number;
  cartQuantity: number;
  stock: number;
}