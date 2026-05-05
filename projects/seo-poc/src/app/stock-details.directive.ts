import { ContentChild, Directive, ElementRef, forwardRef, HostListener, signal, Signal } from '@angular/core';
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
  _state = signal<CE>("collapsed")
  get state(): Signal<CE> {
    return this._state
  }
  set state(value: CE) {
      this.elementRef.nativeElement.open=value=="expanded"?true:false;   
    this._state.set(value)
  }
  @HostListener("toggle")
  toggle(): void {
      
      if (this.state()=="collapsed")
      {
          this.state="expanded"
         
      }
      else
      {
        this.state="collapsed"
       
        
      }
      
    
    
  }

  
}
