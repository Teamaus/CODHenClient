import { Component, ViewChild } from '@angular/core';
import { CollapseExpandComponent } from "../collapse-expand/collapse-expand.component";
import { CodcodaButtonComponent } from '../codcoda-button/codcoda-button.component';
import { ExpandCollapseComponent } from '../../../../../src/app/expand-collapse/expand-collapse.component';

@Component({
  selector: 'app-test-ec',
  imports: [CollapseExpandComponent],
  templateUrl: './test-ec.component.html',
  styleUrl: './test-ec.component.css'
})
export class TestEcComponent {
    @ViewChild(CollapseExpandComponent) ce?:CollapseExpandComponent   
    toggle(){
      alert("Here")
      this.ce?.toggle()
    } 
}
