import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];
  id: number = 0;
  listsShoppingCart: Array <any> = [];

  constructor (private router: Router) { }

  CreateShoppingCart (shoppingCart: ShoppingCart) {
    //------ CREATE NEW SHOPPING CART
    this.shoppingCartList.push(shoppingCart);
    //------ SAVE LOCAL STORAGE
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  getShoppingCartList () {
    return this.shoppingCartList;
  };

  attTag(tagUrl: string) {
    for (let itens of this.shoppingCartList) {
      itens.tag = tagUrl;
    };

    //----ATT CACHE LOCAL STORAGE-----/
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  removeItemTheShoppingCart(checkboxList: Array<number>) {
    for (let i of checkboxList) {
      if (i === this.shoppingCartList[i].id) {
          i = this.shoppingCartList.indexOf(this.shoppingCartList[i])
          this.shoppingCartList.splice(i, 1);
      }
    };
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
    location.reload();
    this.router.navigateByUrl('');
  };

  saveShoppingCartList (shoppingCartList: Array <ShoppingCart>) {
    localStorage.setItem('saveShoppingCart', JSON.stringify(shoppingCartList));
    window.alert('Lista salva com sucesso!')
  };


}; //end
