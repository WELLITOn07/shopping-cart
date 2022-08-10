import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];

  constructor () { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    //------ CREATE NEW SHOPPING CART
    this.shoppingCartList.push(shoppingCart);
    //------ SAVE LOCAL STORAGE
    let ShoppingCartListLocalStorage = localStorage.clear();
    ShoppingCartListLocalStorage = localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCartList));
    console.log(this.shoppingCartList);
  };

  getShoppingCartList () {
    return this.shoppingCartList;
  };
}; //end
