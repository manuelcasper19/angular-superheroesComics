import { Component, Input, OnInit,  AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';

import { Foto } from '../../interface/heroe.interface';

  
  import SwiperCore, { Scrollbar, Navigation, Pagination, Autoplay, SwiperOptions, Controller, Thumbs, Zoom,
    A11y, Virtual, } from 'swiper';


SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-swipera-heroe',
  templateUrl: './swipera-heroe.component.html',
  styleUrls: ['./swipera-heroe.component.css']
})
export class SwiperaHeroeComponent implements OnInit, AfterViewInit {

  @Input() fotos : Foto [] = [];
 

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {}

 

  ngAfterViewInit(): void {
   
  
  }
  ngOnInit(): void {
    
    
  }


}
