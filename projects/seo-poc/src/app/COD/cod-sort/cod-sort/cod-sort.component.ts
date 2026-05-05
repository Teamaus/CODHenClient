import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListComponent } from '../../../../../../test-vm/src/app/list/list.component';
import { ListManipulationComponent } from '../../list-manipulation/list-manipulation/list-manipulation.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cod-sort',
  imports: [ListManipulationComponent,FormsModule],
  templateUrl: './cod-sort.component.html',
  styleUrl: './cod-sort.component.css'
})
export class CodSortComponent {
  @Input() options: string[] = [];
  selectedField:string = "" 
  @Output() listChanged: EventEmitter<{sortby:string,descending:boolean}> = new EventEmitter<{sortby:string,descending:boolean}>();
  descending = false 
  onListChanged($event:string){
    this.selectedField = $event
    this.listChanged.emit({sortby:$event,descending:this.descending});
  }
  onSortDirectionChanged(): void {
    this.onListChanged(this.selectedField)
  }
  ngOnInit(){
    this.selectedField = this.options[0]
  }
}
