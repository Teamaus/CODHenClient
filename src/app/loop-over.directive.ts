import { Directive, effect, inject, Inject, input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { IIterator } from './contracts/iterator.interface';
import { ICurrent } from './contracts/icurrent.interface';
import { ITERATOR } from './contracts/TOKENS';

@Directive({
  selector: '[loop-over]',

})
export class LoopOverDirective implements ICurrent  {
 iterator_name = input<string> 
 iterator:IIterator<any> = inject(ITERATOR) as IIterator<any>
 constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {
    console.debug(renderer); // works
    effect(()=>{
      this.iterator.current()
      this.viewContainer.createEmbeddedView(templateRef)

    })
    
      
    
  }
  value() {
   return this.iterator.current() 
  }
  

}
