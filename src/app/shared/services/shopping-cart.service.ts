import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [

  ];

  constructor () { }

  getShoppingCartList () {
    return this.shoppingCartList
  };

}
