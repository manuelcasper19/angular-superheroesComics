import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {


  get user(){
    return this.AuthService.user
  }
  constructor( private AuthService : AuthService,
               private router      : Router ) { }

  ngOnInit(): void {
  }

  logout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
