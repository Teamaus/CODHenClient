import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'cod-sort',
  imports: [SortButtonComponent,NgForOf],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent {
    _sorted_attributes : {name:string,selected:boolean}[] = [] 
    @Input() set sorted_attributes(sa:any[]){
        this._sorted_attributes = sa.map(att=>{ return {name:Object.keys(att)[0],selected:false}})
    }
    @Output() sort = new EventEmitter<{attribute:string,state:"asc"|"desc"}>()
    sort_by(sortby:{attribute:string,state:"asc"|"desc"}){
      
      this.sort.emit(sortby)
    }
    ngOnInit(){
      
    }
}
