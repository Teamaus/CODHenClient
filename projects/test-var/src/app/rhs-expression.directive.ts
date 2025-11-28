import { Directive, input } from '@angular/core';
import { NtsExpressionDirective } from './nts-expression.directive';

@Directive({
  selector: 'expression'
})
export class RhsExpressionDirective {
  expression = input<NtsExpressionDirective>
  constructor() { }

}
