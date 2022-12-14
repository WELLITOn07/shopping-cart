import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FinancialControlComponent } from './components/pages/financial-control/financial-control.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@NgModule({
  declarations: [
    ShoppingCartComponent,
    FinancialControlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ShoppingCartComponent,
    FinancialControlComponent
  ]
})
export class HomeModule { }
