import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];
  id: number = 0;

  constructor () { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    //------ CREATE NEW SHOPPING CART
    this.shoppingCartList.push(shoppingCart);
    //------ SAVE LOCAL STORAGE
    let ShoppingCartListLocalStorage = localStorage.clear();
    ShoppingCartListLocalStorage = localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCartList));
  };

  getShoppingCartList () {
    return this.shoppingCartList;
  };

  attTag(tagUrl: string) {
    for (let itens of this.shoppingCartList) {
      itens.tag = tagUrl;
    };

    //----ATT CACHE LOCAL STORAGE-----/
    let ShoppingCartListLocalStorage =
    localStorage.clear();
    ShoppingCartListLocalStorage = localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCartList));
  };

  removeItemTheShoppingCart(id: number) {
    let checkbox: number = id;
    this.shoppingCartList.forEach(id => {
    });
  };
}; //end
