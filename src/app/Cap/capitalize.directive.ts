import { Directive,HostListener,ElementRef } from '@angular/core';


@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    if (value) {
      this.el.nativeElement.value = this.capitalizeFirstLetter(value);
    }
  }

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


}
