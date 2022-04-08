import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guard/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    
  },
  {
    path: 'heroe',
    loadChildren: () => import('./heroe/heroe.module').then( m => m.HeroeModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]

  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
