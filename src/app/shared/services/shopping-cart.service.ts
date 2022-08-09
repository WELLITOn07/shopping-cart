import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];


  constructor () { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    this.shoppingCartList.push(shoppingCart);
    console.log(this.shoppingCartList);
  };

  getShoppingCartList () {
    return this.shoppingCartList;
  };
}; //end
