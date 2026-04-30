import { Directive, forwardRef } from '@angular/core';
import { PatternsService } from './patterns.service';
import { CODCODA_PAGE, IPage, Pattern } from './contracts/patterns';

@Directive({
  selector: 'codcoda-page',
  providers:[{provide:CODCODA_PAGE,useExisting:forwardRef(()=>CodcodaPageDirective)}
    ,PatternsService
  ],
  exportAs:"codcoda_page"
})
export class CodcodaPageDirective implements IPage{

  constructor(private patternService:PatternsService) {

  }
  get patterns(): Pattern[] {
   return this.patternService.patterns()
  }
  get sectors(): string[] {
    return this.patternService.sectors
  }

}
