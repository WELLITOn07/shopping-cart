export type ShoppingCart = {
  id: number,
  nameList: string;
  dateList: Date;
  cart: {
    nameItem: string;
    valueItem: number ;
    amountItem: number;
    tag: string,
  }
};