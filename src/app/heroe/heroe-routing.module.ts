import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { ListComponent } from './pages/list/list.component';
import { VerHeroeComponent } from './pages/ver-heroe/ver-heroe.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      
      {  path: 'add',       component: AddComponent  },
      {  path: 'search',    component: SearchComponent },
      {  path: 'profile',   component: ProfileUserComponent},
      {  path: 'list',      component: ListComponent },
      {  path: 'own',       component: ListComponent },         
      {  path: 'edit/:id',  component: AddComponent },        
      {  path: ':id',       component: VerHeroeComponent },     
      {  path: '**',        redirectTo: 'list'},
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroeRoutingModule { }
