import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresentLoaderComponent } from 'src/shared/Loader/PresentLoaderComponent';
import { InfoService } from 'src/store/services/info.service';

@Component({
  selector: 'app-point-entry',
  templateUrl: './point-entry.page.html',
  styleUrls: ['./point-entry.page.scss'],
})
export class PointEntryPage implements OnInit {

  constructor(
    private router: Router,
    private infoService:InfoService,
    private presentLoader:PresentLoaderComponent,
  ) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getInfo()
  }

  getInfo(){
    this.infoService.getInfoData()
    .then(data => {
      console.log(data);
      if(data?.isWelcome){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/welcome']);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos de la info:', error);
    });
  }

}
