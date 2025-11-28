import { Directive } from '@angular/core';

@Directive({
  selector: 'expression',
  exportAs:"expression"
})
export class NtsExpressionDirective {
  expression!:NtsExpressionDirective
  constructor() { }

}
