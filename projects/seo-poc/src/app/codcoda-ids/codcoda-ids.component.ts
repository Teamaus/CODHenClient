import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListManipulationComponent } from '../COD/list-manipulation/list-manipulation/list-manipulation.component';

@Component({
  selector: 'codcoda-ids',
  imports: [ListManipulationComponent],
  templateUrl: './codcoda-ids.component.html',
  styleUrl: './codcoda-ids.component.css'
})
export class CodcodaIdsComponent {
  @Input() ids:any[]=[]
  @Output() idChanged = new EventEmitter<any>()
  getIds(){
    const ret = this.ids.map(id=>id.id)
    console.log("IDS:",this.ids)
    return ret
  }
  changed($event:any)
  {
      this.idChanged.emit($event)
  }


}
