import { leadingComment, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  //----- VARIAVEIS -----//
  showTableNameAndTag = true;
  showAddLista: boolean = false;
  showTags: boolean = false;
  showSelectList: boolean = false;
  showTable: boolean = false;
  showInputsAddItens: boolean = false;
  showButtonCreateList: boolean = true;
  showButtonEditList: boolean = false;
  iconShowInputsAddItem: boolean = false;
  theTagUrlSelect: string = '';
  theTagNameSelect: string = '';

  shoppingCartItens: Array<ShoppingCart> = this.shoppingCartService.shoppingCartList;


  //----- FORM P/ MENU DE CRIAR NOME E TAG -----//
  createListForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });



  //----- FORM P/ MENU DE CRIAR ITENS -----//
  createItensForm = new FormGroup({
    nameItem: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    valueItem: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min((1))] }),
    amountItem: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min((1))] }),
  });


  //----- FUNÇÕES P/ MOSTRAR E ESCONDER MENUS (*ngIf)-----//

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.fnCacheLocaltorage()
  }

  //----- FUNÇÃO P/ ADCIONAR ITENS DA SESSION STORAGE (CACHE) -----//
  fnCacheLocaltorage() {
    const cacheShoppingCart = localStorage.getItem('shoppingCart');
    if (cacheShoppingCart) {
      this.showButtonCreateList = false;
      this.showButtonEditList = true;
      this.iconShowInputsAddItem = true;
      this.showTable = true;
      const shoppingCart: Array<ShoppingCart> = JSON.parse(cacheShoppingCart)
      for (let itens of shoppingCart) {
        this.nameList = itens.nameList
        this.theTagUrlSelect = itens.tag;
        this.totalAmount += itens.amountItem;
        this.totalValue += itens.valueItem;
        this.shoppingCartService.CreateShoppingCart(itens);
      }
    };
  };

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
    this.createListForm.reset();
  };

  fnEditList() {
    this.showTableNameAndTag = false;
    this.showSelectList = false;
    this.showTags = false;
    this.showInputsAddItens = false;
    if (this.showAddLista === false) {
      this.showAddLista = true;
    } else {
      this.showAddLista = false;
    }
    this.createListForm.reset();
  };

  fnSelectlist() {
    this.showAddLista = false;
    this.showTags = false;
    this.createListForm.reset()
    this.showInputsAddItens = false;
    if (this.showSelectList === false) {
      this.showSelectList = true;
    } else {
      this.showSelectList = false;
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
  };

  totalAmount: number = 0;
  totalValue: number = 0;
  nameList: string = '';

  //----- FUNÇÃO P/ ADICIONAR ITENS -----//
  fnAddItensCart() {
    this.totalAmount = 0;
    this. totalValue = 0;
    const listName: string = String(this.createListForm.value.name);
    const name = String(this.createItensForm.value.nameItem);
    const value = Number(this.createItensForm.value.valueItem);
    const amount = Number(this.createItensForm.value.amountItem);
    const dateToday = new Date();
    const date = dateToday;
    //----------------------------//
    const newShoppingCart: ShoppingCart =
    {
      nameList: listName,
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
      this.totalValue += total.valueItem;
    });

    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = true;
    this.createItensForm.reset();
  };

  //------ FUNÇÃO MOSTRAR INPUTS DE ADD ITENS -----//
  fnShowInputsAddItemFixed() {
    this.iconShowInputsAddItem = false;
    this.showInputsAddItens = true;
  };
  //----- FUNÇÃO P/ SALVAR LISTA -----//

  saveShoppingCart() {
    window.alert('Lista salva com sucesso!')
    this.showTable = false;
    this.showInputsAddItens = false;
    this.showButtonCreateList = true;
    this.showButtonEditList = false;
    this.showSelectList = false;
  }

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
    let clearLocalStorage = localStorage.clear();
    this.shoppingCartItens = [];
    this.shoppingCartService.shoppingCartList = [];
    window.alert('Lista removida com sucesso!');
    location.reload();
  };


  //----- FUNÇÃO P/ REMOVER ITENS SELECIONADOS -----//
  removeSelected() {
  };

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
