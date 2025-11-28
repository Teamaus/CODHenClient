import { Component, OnInit } from '@angular/core';

export type ep_state = "expand" | "collapse"
@Component({
  selector: 'expand-collapse',
  templateUrl: './expand-collapse.component.html',
  styleUrls: ['./expand-collapse.component.css'],
  exportAs: 'expand-collapse'
})
export class ExpandCollapseComponent implements OnInit {
  
  constructor() { }
  state:ep_state = "collapse"
  ngOnInit(): void {
    
  }
  toggle(){
      this.state = this.state=="expand"?"collapse":"expand"
  }
  get display():string{
      return  this.state=="expand"?"-":"+"
  } 

}
