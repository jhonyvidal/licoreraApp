import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/store/services/config.service';
import { register } from 'swiper/element/bundle';
register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor( private configService: ConfigService, private router: Router,) {
    this.configService.fetchConfigs().subscribe(data => {
      // if(data[0].name === "Welcome" && data[0].data === "true"){
      //   this.router.navigate(['/home']);
      // }
    });
  }
}
