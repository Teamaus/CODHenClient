import { Directive, effect, forwardRef,signal  } from '@angular/core';
import { IConfiguration } from './contracts/configuration.interface';
import { IPattern } from './contracts/pattern.interface';
import { CONFIGURATION } from './contracts/TOKENS';
import { PatternDataService } from './pattern-data.service';
import { SearchEngineService } from './search-engine.service';


@Directive({
  selector: 'configuration',
  providers:[{provide:CONFIGURATION,useExisting:forwardRef(()=>ConfigurationDirective)},PatternDataService],
  exportAs:"configuration"

})
export class ConfigurationDirective implements IConfiguration{
  data = signal<IPattern[]>([])
  
  _patterns:IPattern[] = []
  constructor(private dataService:PatternDataService,private serachEnfgine:SearchEngineService) {
        effect(()=>{
                      this.data.set(this.dataService.data())
                      
                     
                    })
   }
  flatData(data:IPattern[]):any[]
  {
      return this.data().reduce((acc:any[],pattern)=>{
                        const enriched = pattern.pattern_data.map((item:any)=>{return {...item,parent:pattern}})
                        return [...acc,...enriched]
                      },[])
  }
  ngOnInit(){
    
    
  }
  ngAfterViewInit(){
    
    this.dataService.getData("DATA_2025-10-21")
   
  }
  
  parseData(){
      
  }

}
