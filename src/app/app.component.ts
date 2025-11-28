import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StockListPageComponent } from "./stock-list-page/stock-list-page.component";
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { StockListComponent } from './stock-list/stock-list.component';
import { ErrHandlerDirective } from './err-handler.directive';
import { CodColumnExtensionDirective } from './cod-column-extension.directive';
import { ExpandCollapseComponent } from "./expand-collapse/expand-collapse.component";
import { ConfigurationDirective } from './configuration.directive';
import { PatternDirective } from './pattern.directive';

import { NgForOf, NgIf } from '@angular/common';
import { SearchComponent } from './search/search.component';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [NgIf,NgForOf,StockListComponent, ExpandCollapseComponent,ConfigurationDirective,PatternDirective,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'codcoda-app';
  constructor(){
    //console.debug = ()=>{}
  }
}
