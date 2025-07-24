import { Component, forwardRef, OnInit } from '@angular/core';
import { CONFIGURATION } from '../contracts/TOKENS';
import { IConfiguration } from '../contracts/configuration.interface';
import { IPattern } from '../contracts/pattern.interface';

@Component({
  selector: 'configuration',
  providers:[{provide:CONFIGURATION,useExisting:forwardRef(()=>ConfigurationComponent)}],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit,IConfiguration {

  
  constructor() { 
    console.log("CTO CONFIGURATION")
  }
  get patterns(): IPattern[] {
    console.log("Patterns")
    return [] 
  }

  ngOnInit(): void {
  }

}
