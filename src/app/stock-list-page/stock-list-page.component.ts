import { Component, ViewChild } from '@angular/core';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { PatternDirective } from "../pattern.directive";
import { StockListComponent } from "../stock-list/stock-list.component";
import { ExpandCollapseComponent } from "../expand-collapse/expand-collapse.component";
import { WatchListComponent } from "../watch-list/watch-list.component";
import { UserComponent } from "../user/user.component";
import { CONFIGURATION } from '../contracts/TOKENS';
import { IConfiguration } from '../contracts/configuration.interface';
import { NgForOf } from '@angular/common';
import { IPattern } from '../contracts/pattern.interface';
//import { WatchlistCollectionComponent } from "../watchlist-collection/watchlist-collection.component";
//import { PatternListCollectionComponent } from "../pattern-collection/pattern-collection.component";

@Component({
  standalone:true, 
  selector: 'stock-list-page',
  //imports: [ConfigurationComponent, PatternDirective, StockListComponent, ExpandCollapseComponent, WatchListComponent, UserComponent, NgForOf, WatchlistCollectionComponent, PatternListCollectionComponent],
  templateUrl: './stock-list-page.component.html',
  styleUrl: './stock-list-page.component.css',
  
})
export class StockListPageComponent implements IConfiguration {
  @ViewChild(CONFIGURATION) configuration?:IConfiguration
  get patterns():IPattern[]
  {
      let retval:IPattern[] = [] 
      if (this.configuration)
        retval =  this.configuration.patterns
      return retval 

  }
  /*
  get watchList:IWatchList{
    if (this.configuration){
      this.configuration.
    }  
  }*/
  
  

}
