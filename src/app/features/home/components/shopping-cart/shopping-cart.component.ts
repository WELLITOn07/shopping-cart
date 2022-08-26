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
  cacheADD: boolean = true;

  //----- FORM P/ MENU DE CRIAR NOME E TAG -----//
  createListForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  //----- FORM P/ MENU DE CRIAR ITENS -----//
  createItensForm = new FormGroup({
    nameItem: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    valueItem: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min((0.1))] }),
    amountItem: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min((1))] }),
  });

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    if (this.cacheADD) {
      this.fnCacheLocaltorage();
    };
    this.attValueAndMount();
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
      if (savedLists.length === 0) {
        localStorage.removeItem('savedShoppingCart')
      }
    }

    //ITENS DA LOCAL STORAGE//
    const cacheShoppingCart = localStorage.getItem('cacheShoppingCart');
    const cache: Array<ShoppingCart> = JSON.parse(cacheShoppingCart)
    if (cacheShoppingCart && cache.length > 0 && this.shoppingCartItens.length === 0) {
      this.showTableNameAndTag = true;
      this.showButtonCreateList = false;
      this.showButtonEditList = true;
      this.iconShowInputsAddItem = true;
      this.showTable = true;
      const shoppingCart: Array<ShoppingCart> = JSON.parse(cacheShoppingCart)
      for (let itens of shoppingCart) {
        this.id = itens.id;
        this.nameListCache = itens.nameList;
        this.theTagUrlSelect = itens.cart.tag;
        this.shoppingCartService.CreateShoppingCart(itens);
      }
    };
  };

  //FUNÇAO P/ ATUALIZAR VALOR TOTAL E QUANTIDADE DE ITENS//
  attValueAndMount() {
    this.totalAmount = 0;
    this.totalValue = 0;
    this.shoppingCartItens.forEach(item => {
      this.totalAmount += item.cart.amountItem;
      this.totalValue += item.cart.valueItem * item.cart.amountItem
    });
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
  };

  selectNameList: string = '';
  selected: boolean = false;
  fnAddSelectedList(listName: string) {
    this.selected = true;
    this.selectNameList = listName;
  };

  //----- FUNÇÃO MOSTRAR LISTA -----//
  fnShowSelectedList() {
    if (this.shoppingCartItens.length > 0) {
      window.alert('Esvazie o carrinho primeiro!')
    } else {
      if (!this.selectNameList) {
        window.alert('Nenhuma lista selecionada!')
      } else {
        this.showTable = true;
      this.showTableNameAndTag = true;
      this.showAddLista = false;
      this.showTags = false;
      this.showInputsAddItens = false;
      this.iconShowInputsAddItem = true;
      this.showButtonCreateList = false;
      this.showButtonEditList = true;
      const selectListLocalStorage = localStorage.getItem('savedItens');
      const selectList: Array<ShoppingCart> = JSON.parse(selectListLocalStorage);

      if (selectList) {
        selectList.forEach(item => {
          if (item.nameList === this.selectNameList) {
            this.theTagUrlSelect = item.cart.tag;
            this.nameListCache = item.nameList;
          }
        });
        for (let item of selectList) {
          if (item.nameList === this.selectNameList) {
            this.shoppingCartService.shoppingCartList.push(item);
          }
        }
      };
      this.attValueAndMount();
      }
    }
  };
  //FUNÇAO P/ DELETAR LISTA SELECIONADA
  deleteSelectedList() {
    this.showSelectList = false;
    this.showTable = false;
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
    const cacheLocalStorage = localStorage.getItem('cacheShoppingCart');
    const cache: Array<ShoppingCart> = JSON.parse(cacheLocalStorage);
    if (savedItensLS) {
      const savedItens: Array<ShoppingCart> = JSON.parse(savedItensLS);
      savedItens.forEach(item => {
        if (item.nameList === this.selectNameList) {
          let i = savedItens.indexOf(item)
          savedItens.splice(i, 1);
          localStorage.removeItem('cacheShoppingCart');
        }
      });
      for (let item of savedItens) {
        cartList.push(item);
      };
      localStorage.removeItem('savedItens');
      localStorage.setItem('savedItens', JSON.stringify(cartList));
    };

    this.shoppingCartItens = [];
    window.location.reload();
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
    const nameList = String(this.createListForm.value.name)
    const name = String(this.createItensForm.value.nameItem);
    const value = Number(this.createItensForm.value.valueItem);
    const amount = Number(this.createItensForm.value.amountItem);
    const dateToday = new Date();
    const date: Date = dateToday;
    const cacheLocalStorage = localStorage.getItem('cacheShoppingCart');
    const cache: Array<ShoppingCart> = JSON.parse(cacheLocalStorage);
    if (cache) {
      this.id = cache.length++;
    } else {
      if (this.shoppingCartItens.length > 0) {
        this.shoppingCartItens.forEach(item => {
          this.id = item.id++;
        });
    }
    };
    //----------------------------//
    const newShoppingCart: ShoppingCart =
    {
      id: this.id,
      nameList: nameList ? nameList : this.nameListCache,
      dateList: date,
      cart: {
        nameItem: name,
        valueItem: value,
        amountItem: amount,
        tag: this.theTagUrlSelect,
      }

    };
    this.shoppingCartService.CreateShoppingCart(newShoppingCart);
    if (!this.totalValue) {
      this.totalAmount = amount;
      this.totalValue = value * amount;
    } else {
      this.attValueAndMount();
    }
    //----------------------//
    if (this.shoppingCartItens.length === 0) {
      window.location.reload();
    }
    this.createItensForm.reset();
    this.iconShowInputsAddItem = true;
    this.showInputsAddItens = false;
    this.cacheADD = false;
  };

  //------ FUNÇÃO MOSTRAR INPUTS DE ADD ITENS -----//
  fnShowInputsAddItemFixed() {
    this.iconShowInputsAddItem = false;
    this.showInputsAddItens = true;
    this.showSelectList = false;
  };
  //----- FUNÇÃO P/ SALVAR LISTA -----//
  saveShoppingCart() {
    if (this.shoppingCartService.shoppingCartList.length === 0) {
      window.alert('Não é possivel salvar listas vazias!');
    } else {
      this.showInputsAddItens = false;
      this.iconShowInputsAddItem = true;
      this.showButtonCreateList = false;
      this.showButtonEditList = true;
      this.showSelectList = false;
      this.shoppingCartService.saveShoppingCartList(this.shoppingCartService.shoppingCartList);


      //--- ITEM P/ TESTE --//
      // const dateToday = new Date('2022-01-24T21:19:55.782Z');

      // const shopping: Array<ShoppingCart> = [
      //   {id: 100,
      // nameList: 'LISTA TESTE',
      // dateList: dateToday,
      // cart: {
      //   nameItem: 'teste',
      //   valueItem: 10,
      //   amountItem: 50,
      //   tag: 'null',
      // }}
      // ];
      // this.shoppingCartService.saveShoppingCartList(shopping);
    }
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
    window.location.reload();
    window.alert('Lista removida com sucesso!');
  };

  //----- FUNÇÃO P/ ADICIONAR ID -----//
  checkboxList: Array<number> = this.shoppingCartService.checkboxList;
  checkboxSelect(i: number) {
    let checkboxPush: boolean = true;
    if (this.shoppingCartService.checkboxList.length > 0) {
      this.shoppingCartService.checkboxList.forEach(index => {
        if (index == i) {
          let ind = this.shoppingCartService.checkboxList.indexOf(index);
          this.shoppingCartService.checkboxList.splice(ind, 1);
          checkboxPush = false;
        }
      });
    } else if (this.shoppingCartService.checkboxList.length === 0) {
      this.shoppingCartService.checkboxList.push(i);
      checkboxPush = false;
    };

    if (checkboxPush) {
      this.shoppingCartService.checkboxList.push(i);
    };
  };

  removeItemTheShoppingCart() {
    if (this.shoppingCartItens.length === 1) {
      const namesLocalStorage = localStorage.getItem('savedShoppingCart');
      const names: Array<NamesList> = JSON.parse(namesLocalStorage);
      names.forEach(item => {
        if (item.nameList === this.shoppingCartItens[0].nameList) {
          let i: number = names.indexOf(item);
          names.splice(i, 1);
        }
        localStorage.removeItem('savedShoppingCart');
        localStorage.setItem('savedShoppingCart', JSON.stringify(names));
      });

      this.shoppingCartService.removeItemTheShoppingCart(this.checkboxList);
      this.showTable = false;
      this.showInputsAddItens = false;
      this.showButtonCreateList = true;
      this.showButtonEditList = false;
    } else {
      this.shoppingCartService.removeItemTheShoppingCart(this.checkboxList);
    }
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
