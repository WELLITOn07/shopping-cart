import { Component, OnInit } from '@angular/core';
import { NamesList } from 'src/app/shared/models/savedLists.model';
import { ShoppingCart } from 'src/app/shared/models/shoppingCart.model';

@Component({
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss']
})
export class FinancialControlComponent implements OnInit {
  savedShoppingCart: Array<NamesList> = [];
  oneShoppingCartItens: Array<ShoppingCart> = [];
  twoShoppingCartItens: Array<ShoppingCart> = [];
  finalResult: boolean = false;
  totalValueOneList: number = 0;
  totalValueTwoList: number = 0;
  difference: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getSavedLists();
  }
  //----- FUNÇÃO P/ PEGAR NOME E DATA DAS LISTAS SALVAS -----//
  getSavedLists () {
    const savedListsLS = localStorage.getItem('savedShoppingCart');
    const saved: Array<NamesList> = JSON.parse(savedListsLS);
    if (saved) {
      saved.forEach(list => {
        this.savedShoppingCart.push(list);
      })
    };
  };
  //----- FUNÇÃO P/ PEGAR ITENS SALVOS -----//
  applyList() {
    this.finalResult = true;
    this.oneShoppingCartItens = [];
    this.twoShoppingCartItens = [];
    const cartList: Array<ShoppingCart> = [];
    const savedItensLS = localStorage.getItem('savedItens');
    if (savedItensLS) {
      const saved: Array<ShoppingCart> = JSON.parse(savedItensLS);
      saved.forEach(item => {
        let monthItem = String(item.dateList);
        monthItem = monthItem.slice(5, 7);
        if (monthItem === this.monthOneList) {
          this.totalValueOneList += item.cart.valueItem * item.cart.amountItem;
          this.oneShoppingCartItens.push(item);
        }
        if (monthItem === this.monthTwoList) {
          this.totalValueTwoList += item.cart.valueItem * item.cart.amountItem;
          this.twoShoppingCartItens.push(item);
        }
      });
    };
    if (this.totalValueOneList > this.totalValueTwoList) {
      this.difference = this.totalValueOneList - this.totalValueTwoList
    };
    if (this.totalValueOneList < this.totalValueTwoList) {
      this.difference = this.totalValueTwoList -
      this.totalValueOneList
    }
  };

  monthOneList: string = '';
  oneList (list: NamesList) {
    let month = String(list.dateList);
    month = month.slice(5, 7);
    this.monthOneList = month;
    console.log(this.monthOneList);
  };

  monthTwoList: string = '';
  twoList (list: NamesList) {
    let month = String(list.dateList);
    month = month.slice(5, 7);
    this.monthTwoList = month;
    console.log(this.monthTwoList);
 };
}; //end
