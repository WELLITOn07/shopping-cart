import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TagsDirective } from './directives/tags.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TagsDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TagsDirective
  ]
})
export class SharedModule { }
