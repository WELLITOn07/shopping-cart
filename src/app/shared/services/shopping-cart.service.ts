import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];
  id: number = 0;
  listsShoppingCart: Array <any> = [];

  constructor () { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    //------ CREATE NEW SHOPPING CART
    this.shoppingCartList.push(shoppingCart);
    //------ SAVE LOCAL STORAGE
    let ShoppingCartListLocalStorage = localStorage.removeItem('cacheShoppingCart');
    ShoppingCartListLocalStorage = localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
    console.log(this.listsShoppingCart);
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
    localStorage.removeItem('cacheShoppingCart');
    ShoppingCartListLocalStorage = localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  removeItemTheShoppingCart(id: number) {
    let checkbox: number = id;
    this.shoppingCartList.forEach(id => {
    });
  };

  saveShoppingCartList (shoppingCartList: Array <ShoppingCart>) {
    let ShoppingCartListLocalStorage = localStorage.setItem('saveShoppingCart', JSON.stringify(shoppingCartList));
  };


}; //end
