  import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
  import { GoogleAuthService } from '../google-auth.service';
import { NgIf } from '@angular/common';
import { IsLoggedOnDirective } from '../is-logged-on.directive';


  @Component({
    selector: 'app-login',
    imports:[NgIf,IsLoggedOnDirective],
    templateUrl: './login.component.html',
    exportAs:"app-login"
  })
  export class LoginComponent  {
    rendered = false 
    @ViewChild("logged_on") loggedOn?:IsLoggedOnDirective
    @ViewChild('googleBtn')
    
  set googleBtn(el: ElementRef | undefined) {
    console.log("=>>>>>")
    if (!el || this.rendered) return;

    this.rendered = true;

    // init + render only when the element exists
    (async () => {
      await this.auth.initGoogle(async (token) => {
        console.log('Google token:', token);
        console.log("Wait for cod_user")
        const cod_user:any = await this.auth.loginWithBackend(token);
        console.log("got cod_user")
        if (cod_user["cod_id"])
        {
            
            this._isLoggedOn = true
            
            console.log("set cod_user",this._isLoggedOn)
            if (this.loggedOn)
            {
                this.loggedOn.isLoggeOn()
                .subscribe(
                      (res:any)=>{
                          console.log("RES:>>",res)
                          this._isLoggedOn = res["is_logged_on"]
                      }
                )
            }
        }
       
      });
        console.log("Wait for render button ")
        await this.auth.renderButton(el.nativeElement); 
       console.log("render button ")
    })();
  }
    get isLoggedOn():boolean{
      return this._isLoggedOn
    }
    constructor(private auth: GoogleAuthService) {}
    _isLoggedOn = false 
    async ngOnInit(){
      //Here we call the server side to check 
      this._isLoggedOn = false 
    }
    async ngAfterViewInit()
    {
        console.log("loggedOn:",this.loggedOn)
        if (this.loggedOn)
        {
          console.log("Wait for is Logged ON")        
          this.loggedOn.isLoggeOn()
          .subscribe(
            (res:any)=>{
                          console.log("RES:>>",res)
                          this._isLoggedOn = res["is_logged_on"]
                      }
          )
        }
        else
        {
          console.log("NO LOGEON ")
        }
    }
  }