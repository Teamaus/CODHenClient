import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cod-checkbox',
  imports: [FormsModule],
  templateUrl: './cod-checkbox.component.html',
  styleUrl: './cod-checkbox.component.css'
})
export class CodCheckboxComponent {
  @Input() label =""
  @Output() checked = new EventEmitter<boolean>()
  isChecked = false 
  onCheckboxChanged(){
    this.checked.emit(this.isChecked)
  }
}
