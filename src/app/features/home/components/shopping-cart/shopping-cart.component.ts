import { leadingComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  showAddLista: boolean = false;
  showTags: boolean = false;
  showSelectList: boolean = false;
  showTable: boolean = false;
  showInputsAddItens: boolean = false;
  theTagSelect: string = '';
  tagsList: Array<string> = ['varied', 'marketplace', 'shopping'];

  constructor() { }

  ngOnInit(): void {
  }

  fnAddList () {
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
  tagSelect (event: any) {
    const tagIcon:HTMLImageElement = event.target;
    const allTags:NodeListOf<Element> | undefined = document.querySelectorAll('.tagIcon');

    allTags.forEach(tag => {
      tag.classList.remove('tagSelect');
    });
    tagIcon.classList.add('tagSelect');
  };

  fnCreateShoppingCart () {
    this.showAddLista = false;
    this.showTags = false;
    this.showInputsAddItens = true;
    this.showTable = true;
  };

  saveShoppingCart () {
    window.alert('Lista salva com sucesso!')
    this.showTable = false;
    this.showInputsAddItens = false;
  }

  removeShoppingCart() {
    window.alert('Lista removida com sucesso!')
    this.showTable = false;
    this.showInputsAddItens = false;
  };

  removeSelected() {

  }
}
