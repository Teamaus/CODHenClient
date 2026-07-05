import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  ///86730832151-ipovac6easn3sg93lk867ffripja8muf.apps.googleusercontent.com
  private readonly clientId = "86730832151-ipovac6easn3sg93lk867ffripja8muf.apps.googleusercontent.com"
  //'86730832151-3uktdklpdcguctbognv8o6fr66lojgns.apps.googleusercontent.com'  
  

  private readonly apiUrl = '/api';

  private googleLoaded?: Promise<void>;

  constructor(private http: HttpClient) {}

  /** Loads Google Identity Services script exactly once */
  private loadGoogle(): Promise<void> {
    if (this.googleLoaded) return this.googleLoaded;
    
    this.googleLoaded = new Promise<void>((resolve, reject) => {
      // already loaded
      if (window.google?.accounts?.id) return resolve();

      const scriptId = 'google-gsi';
      
      if (document.getElementById(scriptId)) {
        // script tag exists but maybe not finished loading yet
        console.log("HERE===>")
        const check = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(check);
            console.log("THERE===>")
            resolve();
          }
        }, 50);

        setTimeout(() => {
          clearInterval(check);
          reject(new Error('Google GSI script tag exists but did not initialize.'));
        }, 8000);
        
        return;
      }
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google GSI script'));
      console.log("====GOOGLE SCRIPT====")
      console.log("GS:",script)
      console.log("====GOOGLE SCRIPT====")
      document.head.appendChild(script);
    });

    return this.googleLoaded;
  }

  async initGoogle(onToken: (idToken: string) => void): Promise<void> {
    
    await this.loadGoogle();
    console.log('RUNTIME clientId:', this.clientId);
    console.log('RUNTIME origin:', location.origin);

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (resp: any) => onToken(resp.credential),
    });    
    
  }

  async renderButton(element: HTMLElement): Promise<void> {
    await this.loadGoogle();
    console.log("Render button...", window.google.accounts.id)
    window.google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      width: 320,
    });
  }

  async loginWithBackend(idToken: string) {
    const retval =  await firstValueFrom(
      this.http.post<{ token: string }>(`${this.apiUrl}/auth/google`, { idToken },{
  withCredentials: true
})
    );
    console.log("RETVAL:",retval)
    return retval 
  }
}