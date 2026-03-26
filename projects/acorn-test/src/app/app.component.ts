import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as acorn from "acorn";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'acorn-test';
  /**
   *
   */
  constructor() {
        const ast = acorn.parse("-ref('a') * (query(ref('b'))+17)", {
        ecmaVersion: 2020
      });


      console.log(ast);

    
  }


}


