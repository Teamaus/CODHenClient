import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Directive, inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: 'is-logged-on',
  exportAs:"logged_on"
})
export class IsLoggedOnDirective {
  platformId = inject(PLATFORM_ID);
  constructor(private http:HttpClient) {

   }
   isLoggeOn():Observable<any>
   {
      
      const url = isPlatformServer(this.platformId)
  ? 'http://localhost:3000/api/auth/is_logged_on'
  : '/api/auth/is_logged_on';
   

    console.log("IS LOGGED ON :",url)
      return this.http.post(url,{},{withCredentials:true})
   }

}
