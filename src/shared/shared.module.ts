import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { customCurrency } from './pipes/customCurrency.pipe';
import { CustomPipe } from './pipes/custom.pipe';
import { ShareObjectService } from './services/shareObject';
import { CartModelPipe } from './pipes/cartModel.pipe';
import { CustomDateOrders } from './pipes/customDateOrders.pipe';
import { ProductDetailModelPipe } from './pipes/productDetailModel.pipe';
import { CustomDateAlert } from './pipes/customDateAlert.pipe';
import { StarRatingComponent } from './components/StarRatingComponent';
import { CommonModule } from '@angular/common';
import { successLottieComponent } from './components/animations/success.lottie.component';
import { PromotionDatePipe } from './pipes/promotionDate.pipe';
import { ExchangeDatePipe } from './pipes/exchangeDate.pipe';


@NgModule({
  declarations: [
    customCurrency,
    CustomPipe,
    CartModelPipe,
    ProductDetailModelPipe,
    CustomDateOrders,
    CustomDateAlert,
    StarRatingComponent,
    successLottieComponent,
    PromotionDatePipe,
    ExchangeDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    customCurrency,
    CustomPipe,
    CustomDateOrders,
    CustomDateAlert,
    CartModelPipe,
    ProductDetailModelPipe,
    HttpClientModule,
    StarRatingComponent,
    successLottieComponent,
    PromotionDatePipe,
    ExchangeDatePipe
  ],
  providers: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
