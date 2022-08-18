import { leadingComment, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { elementAt, filter } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  //----- VARIAVEIS P/ NgIf -----//
  showTableNameAndTag = true;
  showAddLista: boolean = false;
  showTags: boolean = false;
  showSelectList: boolean = false;
  showTable: boolean = false;
  showInputsAddItens: boolean = false;
  showButtonCreateList: boolean = true;
  showButtonEditList: boolean = false;
  iconShowInputsAddItem: boolean = false;
  //----- VARIAVEIS DO SHOPPING CART MODEL
  shoppingCartItens: Array<ShoppingCart> = this.shoppingCartService.shoppingCartList;
  id: number = 0;
  nameListCache: string = '';
  totalAmount: number = 0;
  totalValue: number = 0;
  theTagUrlSelect: string = '';
  theTagNameSelect: string = '';
  listsShoppingCart: Array <any> = this.shoppingCartService.listsShoppingCart;

  //----- FORM P/ MENU DE CRIAR NOME E TAG -----//
  createListForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  //----- FORM P/ MENU DE CRIAR ITENS -----//
  createItensForm = new FormGroup({
    nameItem: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    valueItem: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min((1))]}),
    amountItem: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min((1))]}),
  });

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.fnCacheLocaltorage();
  };

  //----- FUNÇÃO P/ ADCIONAR ITENS DA LOCAL STORAGE (CACHE) -----//
  fnCacheLocaltorage() {
    const cacheShoppingCart = localStorage.getItem('cacheShoppingCart');
    if (cacheShoppingCart) {
      this.showTableNameAndTag = true;
      this.showButtonCreateList = false;
      this.showButtonEditList = true;
      this.showInputsAddItens = true;
      this.showTable = true;
      const shoppingCart: Array<ShoppingCart> = JSON.parse(cacheShoppingCart)
      for (let itens of shoppingCart) {
        this.id = itens.id;
        this.nameListCache = itens.nameList;
        this.theTagUrlSelect = itens.tag;
        this.totalAmount += itens.amountItem;
        this.totalValue += itens.valueItem * itens.amountItem;
        this.shoppingCartService.CreateShoppingCart(itens);
      }
    };
  };

  //----- FUNÇÕES P/ MOSTRAR E ESCONDER MENUS (*ngIf)-----//

  fnAddList() {
    this.showTableNameAndTag = true;
    this.showSelectList = false;
    this.showTags = false;
    this.showInputsAddItens = false;
    if (this.showAddLista === false) {
      this.showAddLista = true;
    } else {
      this.showAddLista = false;
    }
  };

  fnEditList() {
    this.showTableNameAndTag = false;
    this.showSelectList = false;
    this.showTags = false;
    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = false;
    if (this.showAddLista === false) {
      this.showAddLista = true;
    } else {
      this.showAddLista = false;
    };
    this.createItensForm.reset();
  };

  fnSelectlist() {
    this.showAddLista = false;
    this.showTags = false;
    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = true;
    if (this.showSelectList === false) {
      this.showSelectList = true;
    } else {
      this.showSelectList = false;
    };
      this.listsShoppingCart = [];
      const cachesaveShoppingCart = localStorage.getItem('saveShoppingCart');
      const saveShoppingCart = JSON.parse(cachesaveShoppingCart);
      for (let list of saveShoppingCart) {
        this.listsShoppingCart.push(list);
      }
  };

  fnshowTags() {
    if (this.showTags === false) {
      this.showTags = true;
    } else {
      this.showTags = false;
    }
  };

  fnCreateShoppingCart() {
    this.showTableNameAndTag = true;
    this.showAddLista = false;
    this.showTags = false;
    this.showInputsAddItens = true;
    this.showTable = true;
    this.showButtonCreateList = false;
    this.showButtonEditList = true;
    if (this.theTagUrlSelect) {
      this.shoppingCartService.attTag(this.theTagUrlSelect)
    }
  };

  //----- FUNÇÃO P/ ADICIONAR ITENS
  fnAddItensCart() {
    this.id;
    this.totalAmount = 0;
    this.totalValue = 0;
    const nameList = String(this.createListForm.value.name)
    const name = String(this.createItensForm.value.nameItem);
    const value = Number(this.createItensForm.value.valueItem);
    const amount = Number(this.createItensForm.value.amountItem);
    const dateToday = new Date();
    const date = dateToday;
    //----------------------------//
    const newShoppingCart: ShoppingCart =
    {
      id: this.shoppingCartItens.length,
      nameList: nameList ? nameList : this.nameListCache,
      nameItem: name,
      valueItem: value,
      amountItem: amount,
      dateList: date,
      totalAmount: this.totalAmount,
      totalValue: this.totalValue,
      tag: this.theTagUrlSelect,
    };
    this.shoppingCartService.CreateShoppingCart(newShoppingCart);
    //----------------------------//
    this.shoppingCartItens.forEach(total => {
      this.totalAmount += total.amountItem;
      this.totalValue += total.valueItem * total.amountItem;
    });

    this.iconShowInputsAddItem = true;
    this.showInputsAddItens = false;
    this.createItensForm.reset();
  };

  //------ FUNÇÃO MOSTRAR INPUTS DE ADD ITENS -----//
  fnShowInputsAddItemFixed() {
    this.iconShowInputsAddItem = false;
    this.showInputsAddItens = true;
    this.showSelectList = false;
  };
  //----- FUNÇÃO P/ SALVAR LISTA -----//

  saveShoppingCart() {
    this.showInputsAddItens = false;
    this.showButtonCreateList = false;
    this.showButtonEditList = true;
    this.showSelectList = false;
    this.shoppingCartService.saveShoppingCartList(this.shoppingCartItens);
    location.reload();
  };

  //----- FUNÇÃO P/ REMOVER LISTA -----//

  removeShoppingCart() {
    this.showTable = false;
    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = false;
    this.showButtonCreateList = true;
    this.showButtonEditList = false;
    this.showSelectList = false;
    this.totalAmount = 0;
    this.totalValue = 0;
    this.id = 0;
    let clearLocalStorage = localStorage.removeItem('cacheShoppingCart');
    this.shoppingCartItens = [];
    this.shoppingCartService.shoppingCartList = [];
    window.alert('Lista removida com sucesso!');
    location.reload();
  };

  //----- FUNÇÃO P/ ADICIONAR ID -----//
  checkboxList: Array<number> = [];
  checkboxSelect(i: number) {
    let checkboxPush: boolean = true;
    if (this.checkboxList.length > 0) {
      this.checkboxList.forEach(index => {
        if (index == i) {
          i = this.checkboxList.indexOf(index);
          this.checkboxList.splice(i, 1);
          checkboxPush = false;
        }
      });
    } else if (this.checkboxList.length === 0) {
      this.checkboxList.push(i);
      checkboxPush = false;
    };

    if (checkboxPush) {
      this.checkboxList.push(i);
    };
  };

  removeItemTheShoppingCart() {
    this.shoppingCartService.removeItemTheShoppingCart(this.checkboxList);
  }

  //----- FUNÇÃO P/ ADICIONAR TAG NO CARRINHO
  tagSelect(event: any) {
    const tagIcon: HTMLImageElement = event.target;
    const allTags: NodeListOf<Element> = document.querySelectorAll('.tagIcon');

    allTags.forEach(tag => {
      this.theTagUrlSelect = '';
      this.theTagNameSelect = '';
      tag.classList.remove('tagSelect');
    });
    tagIcon.classList.add('tagSelect');

    allTags.forEach(tag => {
      if (tagIcon.classList.contains('wallet')) {
        this.theTagUrlSelect = 'https://icons.iconarchive.com/icons/inipagi/business-economic/48/wallet-icon.png';
        this.theTagNameSelect = 'compras variadas';
      };
      if (tagIcon.classList.contains('cart')) {
        this.theTagUrlSelect = 'https://icons.iconarchive.com/icons/inipagi/business-economic/48/cart-icon.png';
        this.theTagNameSelect = 'compra de alimentos';
      };
      if (tagIcon.classList.contains('store')) {
        this.theTagUrlSelect = 'https://icons.iconarchive.com/icons/inipagi/business-economic/48/store-icon.png';
        this.theTagNameSelect = 'compra de roupas';
      };
      if (tagIcon.classList.contains('service')) {
        this.theTagUrlSelect = 'https://icons.iconarchive.com/icons/inipagi/business-economic/48/point-of-service-icon.png';
        this.theTagNameSelect = 'compra de remédios';
      };
      if (tagIcon.classList.contains('checklist')) {
        this.theTagUrlSelect = 'https://icons.iconarchive.com/icons/inipagi/business-economic/48/checklist-icon.png';
        this.theTagNameSelect = 'compras na internet';
      };
    });
  };


}//end
