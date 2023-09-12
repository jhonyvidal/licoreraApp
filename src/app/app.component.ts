import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { ConfigService } from 'src/store/services/config.service';
import { register } from 'swiper/element/bundle';
register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( 
    private configService: ConfigService,
    private router: Router,
    private platform: Platform
     ) {
    this.initializeApp();
    this.configService.fetchConfigs().subscribe(data => {
      if(data[0].name === "Welcome" && data[0].data === "true"){
        this.router.navigate(['/home']);
      }
    });
  }

  initializeApp(): void {
    //facebook
    this.platform.ready().then(() => {
      FacebookLogin.initialize({ appId: '288163334886248' });
    });
    //google
    this.platform.ready().then(() => {
      GoogleAuth.initialize({
          clientId: '648554160671-paa0hggc1fo4u62gd41e8fpci804v1e7.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        })
    })
  }
  
}
