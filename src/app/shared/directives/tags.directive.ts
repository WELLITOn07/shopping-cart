import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTags]'
})
export class TagsDirective {

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.display = 'none';
  }

}
