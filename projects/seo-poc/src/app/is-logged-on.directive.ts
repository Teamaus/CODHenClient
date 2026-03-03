import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: 'is-logged-on',
  exportAs:"logged_on"
})
export class IsLoggedOnDirective {

  constructor(private http:HttpClient) {

   }
   isLoggeOn():Observable<any>
   {
      
      return this.http.post("http://localhost:3000/auth/is_logged_on",{},{withCredentials:true})
   }

}
