import { ContentChild, Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { CE, ICOLLAPSE_EXPAND, ICollapseExpand } from './contracts/icollapse-expand';
import { CollapseExpandComponent } from './collapse-expand/collapse-expand.component';

@Directive({
  selector: 'details',
  providers:[{provide:ICOLLAPSE_EXPAND,useExisting:forwardRef(()=>StockDetailsDirective)}]
})
export class StockDetailsDirective implements ICollapseExpand{
  @ContentChild(CollapseExpandComponent) collapseExpand?:CollapseExpandComponent
  constructor(private elementRef:ElementRef<HTMLDetailsElement>) {
    console.log("StockDetailsDirective")
   }
  get state(): CE {
    return this.elementRef.nativeElement.open?"expanded":"collapsed"
  }
  toggle(state: CE): void {
      
      if (state=="collapsed")
      {
          this.elementRef.nativeElement.open = false
      }
  }
  @HostListener('toggle')
  onToggle()
  {
      this.collapseExpand?.state.set(this.state) 
  }

}
