import { Directive, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { GridComponent, Column } from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[cod-column-extension]',
  standalone:true
})
export class CodColumnExtensionDirective implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(private grid: GridComponent, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    

  }
  ngAfterViewInit(){
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private onGridDataBound() {
    console.debug("HERE",this.grid.columns)
    this.grid.columns.forEach((col: any) => {
         
      if (col.template) {
        const originalTemplate = col.template;
         console.debug("COL:TRUE",col)
        col.template = (rowData: any) => {
      
          const view = this.viewContainerRef.createEmbeddedView(originalTemplate, {
            $implicit: rowData,
            column: col
          });
          view.detectChanges();
          return view.rootNodes;
        };
      }
      else{
        console.debug("COL: FALSE",col)
      }
    });
  }
}
