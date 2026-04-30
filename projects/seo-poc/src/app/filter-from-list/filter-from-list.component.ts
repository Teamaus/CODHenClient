import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CustomDropdownComponent } from '../cod-down/cod-down.component';

@Component({
  selector: 'cod-filter-from-list',
  imports: [FormsModule,NgForOf],
  templateUrl: './filter-from-list.component.html',
  styleUrl: './filter-from-list.component.css'
})
export class FilterFromListComponent {
  @Input() options:string[]  = []
  @Input() label:string = "" 
  @Input() field:string = ""
  selectedValue = "(All)"

  // Parent component TS
  onFilterChanged($event: any) {
    const selected = $event.target.value;
    console.log('Selected value:', selected)
    if (selected!=null)
    {
      console.log('User selected:', selected);
      // apply your filtering logic here
      
      this.filterBy.emit(selected) 
    }
  }
  @Output() filterBy  = new EventEmitter<string>() 

}
