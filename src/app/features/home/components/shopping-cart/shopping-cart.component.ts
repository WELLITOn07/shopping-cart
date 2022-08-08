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
  theTagUrlSelect: string =  '';
  theTagNameSelect: string = '';

  shoppingCartItens: Array<ShoppingCart> = this.shoppingCartService.getShoppingCartList();

  //----- FORM P/ MENU DE CRIAR NOME E TAG -----//
    createListForm = new FormGroup ({
    name: new FormControl('',{ nonNullable: true, validators: [Validators.required]})
  });



  //----- FORM P/ MENU DE CRIAR ITENS -----//
  createItensForm = new FormGroup ({
    nameItem: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    valueItem: new FormControl(0,{ nonNullable: true, validators: [Validators.required] }),
    amountItem: new FormControl(1,{ nonNullable: true, validators: [Validators.required]}),
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
  };

  fnSelectlist () {
    this.showAddLista = false;
    this.showTags = false;
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
    const itensShoppingCart = this.createItensForm.value;
    this.shoppingCartService.CreateShoppingCart(itensShoppingCart);
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
