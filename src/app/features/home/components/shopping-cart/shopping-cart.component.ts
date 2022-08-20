import { leadingComment, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_ASYNC_VALIDATORS, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { elementAt, filter } from 'rxjs';
import { NamesList } from 'src/app/shared/models/savedLists.model';
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
  namesList: Array<NamesList> = [];

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

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.fnCacheLocaltorage();
  };

  //----- FUNÇÃO P/ ADCIONAR ITENS DA LOCAL STORAGE (CACHE) -----//
  fnCacheLocaltorage() {
    //PEGAR LISTAS SALVAS//
    const savedLists = localStorage.getItem('savedShoppingCart');
    if (savedLists) {
      const saved = JSON.parse(savedLists);
      for (let list of saved) {
        this.namesList.push(list)
      }
    }
    //ITENS DA LOCAL STORAGE//
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
        this.theTagUrlSelect = itens.cart.tag;
        this.totalAmount += itens.cart.amountItem;
        this.totalValue += itens.cart.valueItem * itens.cart.amountItem;
        this.shoppingCartService.CreateShoppingCart(itens);
      }
    };
  };

  //----- FUNÇÕES P/ MOSTRAR E ESCONDER MENUS (*ngIf)-----//

  fnAddList() {
    this.showTableNameAndTag = true;
    this.showSelectList = false;
    this.showTags = false;
    this.iconShowInputsAddItem = false;
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
  //----- FUNÇÃO SELECIONAR LISTA -----//
  selectedList: [] = [];
  fnSelectlist() {
    this.selectedList = [];
    this.showAddLista = false;
    this.showTags = false;
    this.showInputsAddItens = false;
    this.iconShowInputsAddItem = true;
    if (this.showSelectList === false) {
      this.showSelectList = true;
    } else {
      this.showSelectList = false;
    };
    const savedLists = localStorage.getItem('saveShoppingCart');
    const saved = JSON.parse(savedLists);
    for (let list of saved) {
      console.log(saved);
    }
  };
  selectNameList: string = '';
  selected: boolean = false;
  fnAddSelectedList(listName: string) {
    this.selected = true;
    this.selectNameList = listName;
  };

  //----- FUNÇÃO MOSTRAR LISTA -----//
  fnShowSelectedList() {
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
    const selectListLocalStorage = localStorage.getItem('savedItens');
    let selectList = JSON.parse(selectListLocalStorage);
    if (selectList) {
      for (let item of selectList) {
        if (item.nameList === this.selectNameList) {
          let newShoppingCart: ShoppingCart = {
            nameList: item.nameList,
            dateList: item.dateList,
            id: item.id,
            cart: {
              nameItem: item.cart.nameItem,
              tag: item.cart.tag,
              valueItem: item.cart.valueItem,
              amountItem: item.cart.amountItem,
              totalAmount: item.cart.totalAmount,
              totalValue: item.cart.totalValue
            }
          };
          this.shoppingCartService.CreateShoppingCart(newShoppingCart);
        }
      };
    }
    location.reload();
  };
  //FUNÇAO P/ DELETAR LISTA SELECIONADA
  deleteSelectedList() {
    this.showSelectList = false;
    const savedLists = localStorage.getItem('savedShoppingCart');
    const lists: Array<NamesList> = JSON.parse(savedLists)
    if (lists) {
      lists.forEach(list => {
        if (list.nameList === this.selectNameList) {
          let i = lists.indexOf(list);
          lists.splice(i, 1);
        }
      });
      localStorage.removeItem('savedShoppingCart');
      localStorage.setItem('savedShoppingCart', JSON.stringify(lists))
    };
    const cartList: Array<ShoppingCart> = [];
    const savedItensLS = localStorage.getItem('savedItens');
    if (savedItensLS) {
      const savedItens: Array<ShoppingCart> = JSON.parse(savedItensLS);
      savedItens.forEach(item => {
        if (item.nameList === this.selectNameList) {
          let i = savedItens.indexOf(item)
          savedItens.splice(i, 1);
        }
      });
      for (let item of savedItens) {
        cartList.push(item)
      };
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(cartList));
    };
    localStorage.removeItem('cacheShoppingCart');
    location.reload();
  }
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
    const nameList = String(this.createListForm.value.name)
    const name = String(this.createItensForm.value.nameItem);
    const value = Number(this.createItensForm.value.valueItem);
    const amount = Number(this.createItensForm.value.amountItem);
    const dateToday = new Date();
    const date: Date = dateToday;
    //-----------------------//
    const cacheShoppingCart = localStorage.getItem('cacheShoppingCart');
    const cache: Array<ShoppingCart> = JSON.parse(cacheShoppingCart);
    if (cache.length > 0) {
        cache.forEach(total => {
        this.totalAmount += total.cart.amountItem;
        this.totalValue += total.cart.valueItem * total.cart.amountItem;
        location.reload();
      });
    } else {
      this.totalAmount = amount;
      this.totalValue = value * amount;
    }
    //----------------------------//
    const newShoppingCart: ShoppingCart =
    {
      id: this.shoppingCartItens.length,
      nameList: nameList ? nameList : this.nameListCache,
      dateList: date,
      cart: {
        nameItem: name,
        valueItem: value,
        amountItem: amount,
        totalAmount: this.totalAmount,
        totalValue: this.totalValue,
        tag: this.theTagUrlSelect,
      }
    };
    this.shoppingCartService.CreateShoppingCart(newShoppingCart);
    //----------------------//
    this.createItensForm.reset();
    this.iconShowInputsAddItem = true;
    this.showInputsAddItens = false;
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
    this.shoppingCartService.saveShoppingCartList(this.shoppingCartService.shoppingCartList);
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
