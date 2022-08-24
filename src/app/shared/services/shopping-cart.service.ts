import { Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NamesList } from '../models/savedLists.model';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCartList: Array<ShoppingCart> = []
  checkboxList: Array<number> = [];

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
      console.log(tagUrl);
    };

    //----ATT CACHE LOCAL STORAGE-----/
    localStorage.removeItem('cacheShoppingCart');
    localStorage.setItem('cacheShoppingCart', JSON.stringify(this.shoppingCartList));
  };

  removeItemTheShoppingCart(checkboxList: Array<number>) {
    const savedItensLS = localStorage.getItem('savedItens');
    const saved: Array<ShoppingCart> = JSON.parse(savedItensLS);
    if (saved) {
      checkboxList.forEach(id => {
        if (id === saved[id].id) {
          let i: number = saved.indexOf(saved[id]);
          saved.splice(i, 1);
        }
      });
      localStorage.setItem('savedItens', JSON.stringify(saved));
      window.location.reload();
      window.alert('Removido com sucesso!')
    };


    for (let i of checkboxList) {
      this.shoppingCartList.splice(i, 1);
    };

    localStorage.removeItem('cacheShoppingCart');
    const cacheShoppingCart: Array<ShoppingCart> = [];
    this.shoppingCartList.forEach(item => {
      cacheShoppingCart.push(item);
    });
    localStorage.setItem('cacheShoppingCart', JSON.stringify(cacheShoppingCart));

    if (this.shoppingCartList.length === 1) {
      const savedItens = localStorage.getItem('savedItens');
      const saved: Array<ShoppingCart> = JSON.parse(savedItens);
      saved.forEach(item => {
        if (item.nameList === this.shoppingCartList[0].nameList) {
          let i: number = saved.indexOf(item);
          saved.splice(i, 1);
        }
      });
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(saved));
    };
    checkboxList = [];
    window.location.reload();
  };

  saveShoppingCartList(shoppingCartList: Array<ShoppingCart>) {
    const cartList: Array<ShoppingCart> = [];
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

      const itemLS = localStorage.getItem('savedItens');
      const saved: Array<ShoppingCart> = JSON.parse(itemLS);
      saved.forEach(item => {
        if (item.nameList === shoppingCartList[0].nameList) {
          let i: number = saved.indexOf(item);
          saved.splice(i, 1);
        } else {
          cartList.push(item)
        }
      });
      shoppingCartList.forEach(item => {
        cartList.push(item)
      });
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(cartList))
      window.location.reload();
      window.alert('Lista salva com sucesso!');
    } else {
      namesList.push({ nameList: shoppingCartList[0].nameList, dateList: shoppingCartList[0].dateList });
      localStorage.setItem('savedShoppingCart', JSON.stringify(namesList));

      shoppingCartList.forEach(item => {
        cartList.push(item)
      });
      localStorage.setItem('savedItens', JSON.stringify(cartList))
      window.location.reload();
      window.alert('Lista salva com sucesso!');
    }
  };
}; //end
