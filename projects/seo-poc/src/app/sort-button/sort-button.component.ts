import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cod-sort-button',
  imports: [NgClass],
  templateUrl: './sort-button.component.html',
  styleUrl: './sort-button.component.css'
})
export class SortButtonComponent {
  @Input() attribute="" 
  state:"asc"|"desc"= "asc"
  selected_state:any = {"asc":["arrow"],"desc":["arrow"]}
  @Output() sort_by = new EventEmitter<{state:"asc"|"desc",attribute:string}>()
  @Input() set selected(value:boolean){
    Object.keys(this.selected_state).forEach(key=>this.selected_state[key]=["arrow"])
    value?this.selected_state[this.state] = ["arrow","selected"]:["arrow"]
  }
  
  State(state:"asc"|"desc" ){
    this.state=state
    this.selected = true

    this.sort_by.emit({state:this.state,attribute:this.attribute})  
  }
  get current_selected(){
    return this.selected_state[this.state]
  }
  



}
