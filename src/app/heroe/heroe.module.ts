import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroeRoutingModule } from './heroe-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { ListComponent } from './pages/list/list.component';
import { VerHeroeComponent } from './pages/ver-heroe/ver-heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarsComponent } from './components/snackbars/snackbars.component';
import { TarjetaHeroeComponent } from './components/tarjeta-heroe/tarjeta-heroe.component';
import { SwiperModule } from 'swiper/angular';
import { SwiperaHeroeComponent } from './components/swipera-heroe/swipera-heroe.component';
import { ConfirmarBorrarComponent } from './components/confirmar-borrar/confirmar-borrar.component';

import { ImageToDataUrlModule } from "ngx-image2dataurl";
import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    ListComponent,
    VerHeroeComponent,
    HomeComponent,
    ProfileUserComponent,
    SnackbarsComponent,
    TarjetaHeroeComponent,
    SwiperaHeroeComponent,
    ConfirmarBorrarComponent,
    ImagenPipe
  ],
  imports: [
    CommonModule,
    HeroeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    ImageToDataUrlModule,
    
    
  ]
})
export class HeroeModule { }
