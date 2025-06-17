export interface GetProductByPIDDto {
  pid:         number;
  name:        string;
  description: string;
  imageUrl:    string;
  price:       number;
  stock:       number;
}