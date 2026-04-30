import { NgForOf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cod-down-dropdown',
  imports:[NgForOf],
  templateUrl: './cod-down.component.html',
  styleUrls: ['./cod-down.component.css']
})
export class CustomDropdownComponent {
  /** Dropdown options (display string) */
  @Input() options: string[] = [];

  /** Text colour of the button label – default #0B9981 */
  @Input() textColor: string = '#0B9981';

  /** Colour of the arrow – default #0B9981 */
  @Input() arrowColor: string = '#0B9981';

  /** Label shown when nothing is selected – default "Select" */
  @Input() placeholder: string = 'Select';

  /** Currently selected value */
  selectedValue: string | null = null;

  /** Emits the selected value */
  @Output() selected = new EventEmitter<string>();

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    const menu = (event.target as HTMLElement).parentElement?.querySelector('.dropdown-menu') as HTMLElement;
    menu?.classList.toggle('open');
  }

  choose(value: string): void {
    this.selectedValue = value;
    this.selected.emit(value);
    const menu = document.querySelector('.dropdown-menu') as HTMLElement;
    menu?.classList.remove('open');
  }
}