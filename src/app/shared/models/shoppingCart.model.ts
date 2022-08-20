export type ShoppingCart = {
  id: number,
  nameList: string;
  dateList: Date;
  cart: {
    nameItem: string;
    valueItem: number ;
    amountItem: number;
    totalAmount: number;
    totalValue: number;
    tag: string,
  }
};