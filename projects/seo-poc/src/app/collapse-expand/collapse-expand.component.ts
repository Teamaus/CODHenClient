import { Component, computed, Inject, input, model, Optional, signal } from '@angular/core';
import { CE, ICOLLAPSE_EXPAND, ICollapseExpand } from '../contracts/icollapse-expand';
import { NgIf } from '@angular/common';

@Component({
  selector: 'codcoda-collapse-expand',
  imports: [NgIf],
  templateUrl: './collapse-expand.component.html',
  styleUrl: './collapse-expand.component.css'
  
})
export class CollapseExpandComponent {
  state = computed<CE>(()=>this.collapse_expand.state())
  constructor(@Inject(ICOLLAPSE_EXPAND)private collapse_expand:ICollapseExpand)
  {
      console.log("CE=>>>",this.collapse_expand)
  }
  
  toggle(){
    this.collapse_expand.toggle()
  }
}
