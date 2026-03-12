import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowGridColumn, RowGridComponent, RowGridRow } from '../row-grid/row-grid.component';
import { ResponseParserService } from '../response-parser.service';
import { ApiListService } from '../api-list.service';

export type RowId = string | number;
export type GridColumn<T> = { key: keyof T; header: string; width?: string };

@Component({
  selector: 'app-row-grid-popup',
  standalone: true,
  imports: [CommonModule, RowGridComponent],
  templateUrl: './row-grid-popup.component.html',
  styleUrls: ['./row-grid-popup.component.css']
})
export class RowGridPopupComponent {
  @Input() resp:any 
  @Input() open = false;
  @Input() title = 'Select rows';
  @Input() rows: RowGridRow[] = [];
  @Input() columns: RowGridColumn[]=[]
  @Input() idKey: string = "" 
  @Input() multi = true;

  @Output() closed = new EventEmitter<void>();
  @Output() done = new EventEmitter<RowGridRow[]>();

  selectedIds: RowId[] = [];
  constructor(private respParser:ResponseParserService,private apiListService:ApiListService){

  }
  ngOnInit(){
      console.log("RESP POPUP:",this.resp)
      const api = this.apiListService.getPrev(this.resp.current,this.resp.api_list)
      const outField = this.apiListService.outField(api.out_schema)
      const data = this.respParser.getData(this.resp,outField)
      console.log("RESP COLL:",this.apiListService.getCurrentApi(this.resp.current,this.resp.api_list))
      const manual = this.apiListService.getCurrentApi(this.resp.current,this.resp.api_list).manual
      const respColumns = manual.Columns
      
      
      this.columns = respColumns.map((c:any)=>{return {key:c.key,header:c.header,width:"100px"}})
      this.rows = data.map((item:any)=>{return {"ProductID":item}})
      
      this.idKey = manual.key_id
      console.log("Rows:",this.rows)
   
  }
  onDone() {
    const selectedRows = this.rows.filter(r =>
      this.selectedIds.includes(r[this.idKey] as RowId)
    );
    this.done.emit(selectedRows);
    this.closed.emit();
  }

  onCancel() {
    this.closed.emit();
  }
}