import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RequestUseCases } from 'src/services/domains/usecase/request-use-case';
import { presentAlert } from 'src/shared/components/alert.component';
import { InfoService } from 'src/store/services/info.service';
import { UserService } from 'src/store/services/user.service';
import { Location } from '@angular/common'
import { Capacitor } from '@capacitor/core';
import { ShareObjectService } from 'src/shared/services/shareObject';
import { SignInObjectService } from 'src/shared/services/signInObject';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {

  
  constructor(
    private requestUseCase:RequestUseCases,
    private userService:UserService,
    private router:Router,
    private alertController:AlertController,
    private infoService:InfoService,
    private location:Location,
    private el: ElementRef,
    private renderer: Renderer2,
    private shareObjectService:ShareObjectService,
    private signInObjectService: SignInObjectService
    ) { }

  currentOrder: any = {};
  minimumOrderAmount: number = 0;
  contentHeigth:string = 'content-exchange-products1';
  buttonWelcome:string = 'buttonWelcome';
  isCurrentEmpty:boolean = true;

  async ngOnInit() {
    const token = await this.getToken()
    if(token){
      this.getCurrentOrder()
    }
    // this.getHeigthInfo()
    const platform = Capacitor.getPlatform();
    if(platform !== "web") {;
      setTimeout(() => {
        this.applyStyle();
      }, 500);
    }
    this.getInfo();
  }

  private applyStyle(): void {
    const contentElement = this.el.nativeElement.querySelector('.contentHeigth');
  
    if (contentElement) {
      const maxHeight = window.innerHeight - 435
      this.renderer.setStyle(contentElement, 'height', `${maxHeight}px`);
      this.renderer.setStyle(contentElement, 'overflow-y', 'scroll');
    } else {
      console.error('Los elementos no fueron encontrados en el DOM.');
    }
  }

  getInfo() {
    this.requestUseCase.GetInfo()
    .subscribe((response) => {
      if(response.success === true){
        console.log('response.data: ', response.data);
        
       this.minimumOrderAmount = response.data.minimumOrderAmount
      //  this.minimumAmountForPoints  = response.data.minimumAmountForPoints ;
      }else{
        console.log(response);
      }
     
    });
  }

  async getCurrentOrder(){
    const token = await this.getToken()
    console.log(token);
    
    this.requestUseCase
    .getCurrentOrder(
      token
    )
    .subscribe(
      (response) => {
        if (response.success === true) {
          if(response.data !== null){
            this.isCurrentEmpty = false;
            console.log("current: ",response.data);
            this.currentOrder = response.data
          }
          console.log('success', response);
        } else {
          this.isCurrentEmpty = true;
          console.log('success', response);
        }
      },
      (error) => {
        console.error('Ha ocurrido un error:', error);
      }
    );
  }

  getToken() {
    const response = this.userService.getUserData()
    .then(data => {
      return data?.api_token
    })
    .catch(error => {
      console.error('Error al obtener los datos del usuario:', error);
      this.signInObjectService.setObjetoCompartido("/current-order")
      this.router.navigate(['/sign-in']);
      return 'Error al obtener los datos del usuario'
    });
    return response;
  }

  async cancelAlert() {
    await presentAlert(
      this.alertController,
      'INFORMACIÓN',
      '¿Estás seguro que quieres cancelar el pedido?',
      '/assets/img/stop.svg',
      '',
      () => this.cancelCurrentOrder(),
      'Logout'
    );
  }

  async cancelCurrentOrder(){
      const token = await this.getToken()
      this.requestUseCase
      .cancelCurrentOrder(
        token
      )
      .subscribe(
        (response) => {
          if (response.success === true) {
            this.showAlertSuccess();
            console.log('success', response);
          } else {
            console.log('success', response);
          }
        },
        (error) => {
          console.error('Ha ocurrido un error:', error);
        }
      );
  }

  async showAlertSuccess() {
    await presentAlert(
      this.alertController,
      '¡FELICITACIONES!',
      'Te pedido fue cancelado exitosamente. Puedes seguir comprando ahora.',
      '/assets/img/checkGreen.svg',
      '',
      () => this.goToHome()
    );
  }

  goToHome(){
    this.shareObjectService.setObjetoCompartido('tab3')
    this.router.navigate(['/home/tab3']);
  }

  goBack(): void {
    this.location.back();
  }

}
