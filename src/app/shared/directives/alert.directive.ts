import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
    this.elementRef.nativeElement.style.color = 'white';
  };

}
