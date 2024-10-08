import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FacebookLogin } from '@capacitor-community/facebook-login';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
// import { ConfigService } from 'src/store/services/config.service';
import { register } from 'swiper/element/bundle';
import { FirebaseAuthenticationService } from './core';
import { InfoService } from 'src/store/services/info.service';
register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    // private configService: ConfigService,
    private router: Router,
    private platform: Platform,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private infoService:InfoService
     ) {
    this.initializeApp();   
    this.infoService.setHeightData(this.platform.height())
  }

  //Firebase
  private async initializeApp(): Promise<void> {
    await this.firebaseAuthenticationService.initialize();
  }

}
