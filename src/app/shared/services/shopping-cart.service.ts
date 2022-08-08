import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];
  totalAmount: number = 0;
  totalValue: number = 0;

  constructor () { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    this.shoppingCartList.push(shoppingCart);
  };

  getShoppingCartList () {
    return this.shoppingCartList;
  };

}; //end
