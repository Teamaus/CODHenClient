import { Component, effect, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodcodaButtonComponent } from './codcoda-button/codcoda-button.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockCardListComponent } from './stock-card-list/stock-card-list.component';
import { NgForOf, NgIf } from '@angular/common';
import { TestEcComponent } from './test-ec/test-ec.component';
import { StockListComponent } from '../../../../src/app/stock-list/stock-list.component';

import { StockCardViewModel } from './contracts/stock-card-vm';
import { Pattern } from './contracts/patterns';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CodHeaderComponent } from './cod-header/cod-header.component';
import { Page } from '@syncfusion/ej2-angular-grids';
import { CodcodaPageComponent } from './codcoda-page/codcoda-page.component';
import { CodcodaPageDirective } from './codcoda-page.directive';

@Component({
  selector: 'app-root',
  //imports: [TestEcComponent  ],
  imports:[CodcodaPageComponent,LoginComponent,NgIf,CodHeaderComponent,CodcodaPageDirective],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seo-poc';
  
  constructor(){
  
  }
  

  
  
}
