import { Component } from '@angular/core';
import { RowGridComponent } from "../row-grid/row-grid.component";
import { JsonPipe } from '@angular/common';
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
type GridColumn<T> = { key: keyof T; header: string; width?: string };

@Component({
  selector: 'test-app-row-grid',
  standalone:true,
  imports: [RowGridComponent,JsonPipe],
  templateUrl: './test-grid.component.html',
  styleUrl: './test-grid.component.css'
})
export class TestGridComponent {
  products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, stock: 5 },
  { id: 2, name: 'Keyboard', price: 80, stock: 30 },
  { id: 3, name: 'Mouse', price: 40, stock: 50 },
  { id: 4, name: 'Monitor', price: 450, stock: 12 }
];
  productColumns :GridColumn<Product>[] = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: 'Product Name', width: '200px' },
  { key: 'price', header: 'Price', width: '120px' },
  { key: 'stock', header: 'Stock', width: '120px' }
];
selectedIds:number[] = []
constructor(){
  alert("Here")
}
Done(){
  console.log("SelectedIDS",this.selectedIds)
}

}
