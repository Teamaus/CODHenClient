import { Routes } from '@angular/router';
import { PComponent } from './p/p.component';

export const routes: Routes = [
	{path:'',pathMatch: 'full',redirectTo:"/c/patterns/main"},
	{path:":context/patterns/:pid",component:PComponent},


];
