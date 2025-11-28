import { Directive, effect, forwardRef, input, Input } from '@angular/core';
import { PATTERN } from './contracts/TOKENS';
import { IPattern, IPatternWrapper } from './contracts/pattern.interface';
import { PatternDataService } from './pattern-data.service';

@Directive({
  selector: 'pattern',
  providers:[{provide:PATTERN,useExisting:forwardRef(()=>PatternDirective)}],
})
export class PatternDirective implements IPatternWrapper  {
  _pattern = input<IPattern>(undefined, { alias: 'pattern' })
  
  get pattern(): IPattern | undefined {
     return this._pattern()
  }
  
}



