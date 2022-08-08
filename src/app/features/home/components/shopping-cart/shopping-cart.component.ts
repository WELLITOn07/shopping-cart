import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  theTagUrlSelect: string =  '';
  theTagNameSelect: string = '';
  totalAmount: number = this.shoppingCartService.totalAmount;
  totalValue: number = this.shoppingCartService.totalValue;

  shoppingCartItens: Array<ShoppingCart> = this.shoppingCartService.getShoppingCartList();

  //----- FORM P/ MENU DE CRIAR NOME E TAG -----//
    createListForm = new FormGroup ({
    name: new FormControl({nonNullable: true, validators: [Validators.required]})
  });



  //----- FORM P/ MENU DE CRIAR ITENS -----//
  createItensForm = new FormGroup ({
    nameItem: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    valueItem: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    amountItem: new FormControl(1,{nonNullable: true, validators: [Validators.required]}),
  });

  //----- FUNÇÕES P/ MOSTRAR E ESCONDER MENUS (*ngIf)-----//

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  fnAddList () {
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

  fnSelectlist () {
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

  fnshowTags () {
    if (this.showTags === false) {
      this.showTags = true;
    } else {
      this.showTags = false;
    }
  };

  fnCreateShoppingCart () {
    this.showTableNameAndTag = true;
    this.showAddLista = false;
    this.showTags = false;
    this.showInputsAddItens = true;
    this.showTable = true;
    this.showButtonCreateList = false;
    this.showButtonEditList = true;
  };

  //----- FUNÇÃO P/ ADICIONAR ITENS -----//
  fnAddItensCart () {
    const list = String(this.createListForm.value.name)
    const name = String(this.createItensForm.value.nameItem);
    const value = Number(this.createItensForm.value.valueItem);
    const amount = Number(this.createItensForm.value.amountItem);
    const dateToday = new Date();
    const date = dateToday;
    const newShoppingCart: ShoppingCart =
      {
        nameList: list,
        nameItem: name,
        valueItem: value,
        amountItem: amount,
        dateList: date
      };
    this.shoppingCartService.CreateShoppingCart(newShoppingCart);

    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = true;
    this.createItensForm.reset();


    let total = this.shoppingCartItens.map(amount => amount.amountItem);
  };

  //------ FUNÇÃO MOSTRAR INPUTS DE ADD ITENS -----//
  fnShowInputsAddItemFixed () {
    this.iconShowInputsAddItem = false;
    this.showInputsAddItens = true;
  };
   //----- FUNÇÃO P/ SALVAR LISTA -----//

  saveShoppingCart () {
    window.alert('Lista salva com sucesso!')
    this.showTable = false;
    this.showInputsAddItens = false;
    this.showButtonCreateList = true;
    this.showButtonEditList = false;
    this.showSelectList = false;
  }

  //----- FUNÇÃO P/ REMOVER LISTA -----//

  removeShoppingCart() {
    window.alert('Lista removida com sucesso!')
    this.showTable = false;
    this.showInputsAddItens = false;
    this.showButtonCreateList = true;
    this.showButtonEditList = false;
    this.showSelectList = false;
  };

  //----- FUNÇÃO P/ REMOVER ITENS SELECIONADOS -----//

  removeSelected() {

  };

  //----- FUNÇÃO P/ ADICIONAR TAG NO CARRINHO

  tagSelect (event: any) {
    const tagIcon:HTMLImageElement = event.target;
    const allTags:NodeListOf<Element> = document.querySelectorAll('.tagIcon');

    allTags.forEach(tag => {
      this.theTagUrlSelect = '';
      this.theTagNameSelect = '';
      tag.classList.remove('tagSelect');
    });
    tagIcon.classList.add('tagSelect');

    allTags.forEach(tag => {
      if (tagIcon.classList.contains('wallet')) {
        this.theTagUrlSelect =  'https://icons.iconarchive.com/icons/inipagi/business-economic/48/wallet-icon.png';
        this.theTagNameSelect = 'compras variadas';
      };
      if (tagIcon.classList.contains('cart')) {
        this.theTagUrlSelect =  'https://icons.iconarchive.com/icons/inipagi/business-economic/48/cart-icon.png';
        this.theTagNameSelect = 'compra de alimentos';
      };
      if (tagIcon.classList.contains('store')) {
        this.theTagUrlSelect =  'https://icons.iconarchive.com/icons/inipagi/business-economic/48/store-icon.png';
        this.theTagNameSelect = 'compra de roupas';
      };
      if (tagIcon.classList.contains('service')) {
        this.theTagUrlSelect =  'https://icons.iconarchive.com/icons/inipagi/business-economic/48/point-of-service-icon.png';
        this.theTagNameSelect = 'compra de remédios';
      };
      if (tagIcon.classList.contains('checklist')) {
        this.theTagUrlSelect =  'https://icons.iconarchive.com/icons/inipagi/business-economic/48/checklist-icon.png';
        this.theTagNameSelect = 'compras na internet';
      };
    });
  };


}//end
