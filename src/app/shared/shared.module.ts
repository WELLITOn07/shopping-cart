import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertDirective } from './directives/alert.directive';
import { UserDirective } from './directives/user.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertDirective,
    UserDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertDirective,
    UserDirective
  ]
})
export class SharedModule { }
