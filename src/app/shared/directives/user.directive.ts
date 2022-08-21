import { ThisReceiver } from '@angular/compiler';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUser]'
})
export class UserDirective {

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.color = '#E5E5E5',
    elementRef.nativeElement.style.textDecoration = 'none',
    elementRef.nativeElement.style.cursor = 'auto'
   }

}
