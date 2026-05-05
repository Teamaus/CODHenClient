import { Component, Input, Output, EventEmitter, forwardRef, Provider } from '@angular/core';
import { LIST_MANIPULATION_COMPONENT } from '../contracts/list-manipulation.tokens';
import { IListManipulation, LIST_MANIPULATION } from '../list-manipulation.interface';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'cod-list-manipulation',
  imports: [FormsModule,NgForOf],
  templateUrl: "./list-manipulation.component.html",
  styleUrl: './list-manipulation.component.css',
  providers: [
    {
      provide: LIST_MANIPULATION_COMPONENT,
      useExisting: forwardRef(() => ListManipulationComponent)
    },
    {
      provide: LIST_MANIPULATION,
      useExisting: forwardRef(() => ListManipulationComponent),
      multi: true
    }
  ]
})
export class ListManipulationComponent implements IListManipulation {
  @Input() options: string[] = [];
  @Input() selectedValue: string = '(All)';
  @Input() label: string = ''; // added input
  @Output() listChanged: EventEmitter<string> = new EventEmitter<string>();
  onListChanged($event: any) {
    const selected = $event.target.value;
    console.log('Selected value:', selected);
    if (selected != null) {
      console.log('User selected:', selected);
      this.listChanged.emit(selected);
    }
  }
  ngOnInit()
  {

    this.selectedValue = this.options[0]
    console.log("SELECTED VALUE:",this.selectedValue,this.options)
    console.log("ListManipulationComponent Label:",this.label)
  }
}
