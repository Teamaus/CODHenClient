import { Directive, EventEmitter, forwardRef, Signal } from '@angular/core';
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
      console.log("getPatterns() directive")
      console.trace("CREATED")
  }
  PageChanged(id: any): void {

    this.patternService.getPatterns(id)
    
  }
  ngOnDestroy() {
    
    console.log('CodcodaPageDirective DESTROYED');
    console.trace("DESTROYED")
  }
  
  get ids(): any[] {
    return this.patternService.ids
  }
  get patterns(): Signal<Pattern[]> {
   return this.patternService.patterns
  }
  get sectors(): string[] {
    return this.patternService.sectors
  }

}
