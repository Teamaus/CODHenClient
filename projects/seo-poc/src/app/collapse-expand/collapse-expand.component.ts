import { Component, Inject, input, model, Optional } from '@angular/core';
import { CE, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { NgIf } from '@angular/common';

@Component({
  selector: 'codcoda-collapse-expand',
  imports: [NgIf],
  templateUrl: './collapse-expand.component.html',
  styleUrl: './collapse-expand.component.css'
  
})
export class CollapseExpandComponent {

  
  state = model<CE>("collapsed")
  constructor(@Optional()  @Inject(ICOLLAPSE_EXPAND) private collapse_expland:ICollapseExpand)
  {
    
  }
  toggle(){
    
    
    switch (this.state())
    {
        case "collapsed":
          this.state.set ("expanded")
          break; 
        case "expanded":
          this.state.set("collapsed")
          break; 
        
    }
    
  }
}
