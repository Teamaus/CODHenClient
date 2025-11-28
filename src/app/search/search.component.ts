import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURATION } from '../contracts/TOKENS';
import { IConfiguration } from '../contracts/configuration.interface';
import { SearchEngineService } from '../search-engine.service';

@Component({
  selector: 'codcoda-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    frm = new FormGroup({search :new FormControl('')}) 
    constructor(@Inject(CONFIGURATION) private configuration:IConfiguration,private searchEngineService:SearchEngineService){

    } 
    search(){
       
       console.log(this.searchEngineService.search(this.configuration.flatData(this.configuration.data()),this.frm.get("search")?.value))
    } 
}
