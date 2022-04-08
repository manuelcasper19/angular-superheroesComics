import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
    .tab{
      cursor: pointer;
    }

  
    `
  ]
})
export class MainComponent implements OnInit {


  constructor( ) { 
         
               }


  ngOnInit(): void {
    // console.log(this.user)
    // if(this.user){
    //   this.router.navigateByUrl('/heroe')
    // }
  }

}
