import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'pattern'
})
export class PatternDirective {
  @Input() pattern :any = {}
  constructor() { }

}
