import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { NamesList } from '../models/savedLists.model';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartList: Array<ShoppingCart> = [];
  id: number = 0;

  constructor(private router: Router) { }

  CreateShoppingCart(shoppingCart: ShoppingCart) {
    //------ CREATE NEW SHOPPING CART
    this.shoppingCartList.push(shoppingCart);
    //------ SAVE LOCAL STORAGE
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  attTag(tagUrl: string) {
    for (let itens of this.shoppingCartList) {
      itens.cart.tag = tagUrl;
    };

    //----ATT CACHE LOCAL STORAGE-----/
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  removeItemTheShoppingCart(checkboxList: Array<number>) {
    const cacheNameList = localStorage.getItem('cacheShoppingCart');
      const cacheName: Array<ShoppingCart> = JSON.parse(cacheNameList);
      const nameList = cacheName[0].nameList;

    for (let i of checkboxList) {
      if (i === this.shoppingCartList[i].id) {
        i = this.shoppingCartList.indexOf(this.shoppingCartList[i])
        this.shoppingCartList.splice(i, 1);
      }
    };
    //---------------------//
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
    //---------------------//
    const cartList: Array<ShoppingCart> = [];
    const savedItensLS = localStorage.getItem('savedItens');
    const savedItens: Array<ShoppingCart> = JSON.parse(savedItensLS)
    if (savedItens) {
      savedItens.forEach(item => {
        if (item.nameList === nameList) {
          let i = savedItens.indexOf(item);
          savedItens.splice(i, 1);
        }
      });
      savedItens.forEach(item => {
        cartList.push(item);
      });
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(cartList))
    }
    this.router.navigateByUrl('home');
  };

  saveShoppingCartList(shoppingCartList: Array<ShoppingCart>) {
    const namesList: Array<NamesList> = [];
    const savedListsLS = localStorage.getItem('savedShoppingCart');
    if (savedListsLS) {
      const savedLists: Array<NamesList> = JSON.parse(savedListsLS);
      savedLists.forEach(list => {
        namesList.push(list)
      });
      namesList.forEach(item => {
        if (item.nameList === shoppingCartList[0].nameList) {
          let i = namesList.indexOf(item)
          namesList.splice(i, 1);
        }
      });
      namesList.push({ nameList: shoppingCartList[0].nameList, dateList: shoppingCartList[0].dateList });

      localStorage.removeItem('savedShoppingCart');
      localStorage.setItem('savedShoppingCart', JSON.stringify(namesList));
      window.alert('Lista salva com sucesso!');
      this.router.navigateByUrl('home');
    } else {
      namesList.push({ nameList: shoppingCartList[0].nameList, dateList: shoppingCartList[0].dateList });
      localStorage.setItem('savedShoppingCart', JSON.stringify(namesList));
      window.alert('Lista salva com sucesso!');
      this.router.navigateByUrl('home');
    };
    //---------------------//
    const cartList: Array<ShoppingCart> = [];
    const savedItensLS = localStorage.getItem('savedItens');
    if (savedItensLS) {
      const savedItens: Array<ShoppingCart> = JSON.parse(savedItensLS);
      for (let item of savedItens) {
        if (item.nameList === shoppingCartList[0].nameList) {
          let i = savedItens.indexOf(item)
          savedItens.splice(i, 1)
        }
      };
      for (let item of savedItens) {
        cartList.push(item)
      };
      for (let item of shoppingCartList) {
        cartList.push(item)
      };
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(cartList));
      this.router.navigateByUrl('home');
    } else {
      for (let item of shoppingCartList) {
        cartList.push(item)
      }
      localStorage.setItem('savedItens', JSON.stringify(cartList));
      this.router.navigateByUrl('home');
    }
  };

}; //end
