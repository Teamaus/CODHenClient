  import { Component, ElementRef, ViewChild, AfterViewInit, Input, signal, ChangeDetectorRef } from '@angular/core';
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
    @Input() rendered = false 
    @ViewChild("logged_on") loggedOn?:IsLoggedOnDirective
    @ViewChild('googleBtn')
    
  set googleBtn(el: ElementRef | undefined) {
    
    
    if (!el || this.rendered) return;

     console.log("We are here ...2",el)
    this.rendered = true;

    // init + render only when the element exists
    (async () => {
      console.log("Calling init Google")
      await this.auth.initGoogle(async (token) => {
        console.log('Google token:', token);
        console.log("Wait for cod_user")
        const cod_user:any = await this.auth.loginWithBackend(token);
        console.log("got cod_user")
        if (cod_user["cod_id"])
        {
            console.log("set cod_user",this._isLoggedOn)
            //We dont need all of this 
            //ONly rendering and thats it 
            console.log("Wait for render button ")
            
            await this.auth.renderButton(el.nativeElement); 
            console.log("render button ")
            this.loggedOn?.isLoggeOn()
          .subscribe(
            (res:any)=>{
                          console.log("RES:>>2",res)
                          this._isLoggedOn = res["is_logged_on"]
                          this.isLoggedOnSig.set(res["is_logged_on"])
                          this.rendered = false             
                      }
          )

            
            
                           
        }
       
      });
       console.log("Wait for render button ")
                            await this.auth.renderButton(el.nativeElement); 
                            console.log("render button ")  
    })();
    
  }
    isLoggedOnSig = signal<boolean>(false)
    @Input() get isLoggedOn():boolean{  
      return this._isLoggedOn
    }
    constructor(private auth: GoogleAuthService,private cdr: ChangeDetectorRef) {}
    @Input() _isLoggedOn = false
    async ngOnInit(){
      //Here we call the server side to check 
      this.rendered = false
    }
    async ngAfterViewInit()
    {
        console.log("loggedOn:",this.loggedOn)
        this.cdr.detectChanges()
        if (this.loggedOn)
        {
          console.log("We are here ...")
          console.log("Wait for is Logged ON")        
          
          this.loggedOn.isLoggeOn()
          .subscribe(
            (res:any)=>{
                          
                          this._isLoggedOn = res["is_logged_on"]
                          this.isLoggedOnSig.set(res["is_logged_on"])
                          this.rendered = !this._isLoggedOn
                          console.log("RES:>>2",res,this.rendered)
                             
                      }
          )
        }
        else
        {
          console.log("NO LOGEON ")
        }
    }
  }