import { isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { REQUEST } from '@nguniversal/express-engine/tokens';


@Component({
  selector: 'codcoda-page',
  imports: [],
  templateUrl: './p.component.html',
  styleUrl: './p.component.css'
})
export class PComponent {
  isLoggedIn():boolean
  {
    return true 
  }
  constructor(private route:ActivatedRoute){

      console.log("ID:",this.route.snapshot.paramMap.get("pid"),this.route.snapshot.queryParamMap.get('x-render-context'))
      

  }
}
