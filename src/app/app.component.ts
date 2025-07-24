import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { StockListPageComponent } from "./stock-list-page/stock-list-page.component";
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { StockListComponent } from './stock-list/stock-list.component';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'codcoda-app';
}
