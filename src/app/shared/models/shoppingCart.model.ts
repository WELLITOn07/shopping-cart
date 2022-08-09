export type ShoppingCart = {
  nameList: string;
  nameItem: string;
  valueItem: number ;
  amountItem: number;
  dateList: Date;
  totalAmount: number;
  totalValue: number;
  tag: string,
  checkbox?: HTMLInputElement;
};