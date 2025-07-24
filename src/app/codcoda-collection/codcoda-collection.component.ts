import { Component, Input } from '@angular/core';
import { CodcodaCollection } from '../codcoda-collection';

@Component({
  selector: 'codcoda-list-collection',
  imports: [],
  templateUrl: './codcoda-collection.component.html',
  styleUrl: './codcoda-collection.component.css'
})
export class CodcodaListCollectionComponent {
    @Input() collection:any
}
