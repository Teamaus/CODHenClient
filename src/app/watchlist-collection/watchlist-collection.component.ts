import { Component, Inject } from '@angular/core';
import { CodcodaListCollectionComponent } from "../codcoda-collection/codcoda-collection.component";
import { CONFIGURATION } from '../contracts/TOKENS';
import { IConfiguration } from '../contracts/configuration.interface';
import { CodcodaCollection } from '../codcoda-collection';

@Component({
  selector: 'watchlist-collection',
  imports: [CodcodaListCollectionComponent],
  templateUrl: './watchlist-collection.component.html',
  styleUrl: './watchlist-collection.component.css'
})
export class WatchlistCollectionComponent extends CodcodaCollection<any> {
    constructor(@Inject(CONFIGURATION) private configuration:IConfiguration){
      super();
    }
    get collection():any[]{
        return [] 
    }
}
