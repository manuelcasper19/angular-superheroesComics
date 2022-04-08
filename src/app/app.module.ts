import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//import { SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

//import { ImageUploadModule } from "ng2-imageupload";
import { ImageToDataUrlModule } from "ngx-image2dataurl";




// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    //ImageUploadModule
    
    
    ImageToDataUrlModule
    
  ],
  providers: [
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: DEFAULT_SWIPER_CONFIG
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
