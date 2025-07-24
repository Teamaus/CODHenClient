import { Component, Inject } from '@angular/core';
import { CodcodaListCollectionComponent } from "../codcoda-collection/codcoda-collection.component";
import { CodcodaCollection } from '../codcoda-collection';
import { IPattern } from '../contracts/pattern.interface';
import { CONFIGURATION } from '../contracts/TOKENS';
import { IConfiguration } from '../contracts/configuration.interface';

@Component({
  selector: 'pattern-list-collection',
  imports: [CodcodaListCollectionComponent],
  templateUrl: './pattern-collection.component.html',
  styleUrl: './pattern-collection.component.css'
})
export class PatternListCollectionComponent extends CodcodaCollection<IPattern>
{
  constructor(@Inject(CONFIGURATION)private configuration:IConfiguration){
    super()
  }
  override get collection(): IPattern[] {
    return this.configuration.patterns
  }
    
}