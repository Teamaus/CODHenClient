import { Component, input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticker-card',
  imports: [ReactiveFormsModule],
  templateUrl: './ticker-card.component.html',
  styleUrl: './ticker-card.component.css'
})
export class TickerCardComponent implements ControlValueAccessor {
  symbol=input<string>("")
  pattern = input<string>("")
  symbolInfo = input<string>("")
  


  
  selected=false
  isDisabled = false 
  fn1:any = ()=>{} 
  fn2:any = ()=>{}
frm: any;
  writeValue(obj: any): void {
    this.selected = obj 
  }
  registerOnChange(fn: any): void {
   this.fn1 = fn 
  }
  registerOnTouched(fn: any): void {
    this.fn2 = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
  

}
