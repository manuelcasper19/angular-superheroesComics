import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarsComponent } from '../components/snackbars/snackbars.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbardService {

  constructor( private snackbar    : MatSnackBar ) { }
  

  private mensaje(panelClassCss : string, msg: string, icon : string){
    this.snackbar.openFromComponent(SnackbarsComponent,  {
      data: {
        message: msg,
        icon: icon
        },
        duration: 5000,
       panelClass: [panelClassCss]

    })
  }
  mostrarMsgError(msg: string){
    let css ='error-snackbar';       
    let icon = 'report_problem';
    this.mensaje(css,  msg, icon)

  }
  mostrarMsgExito(msg: string){
    let css ='exito-snackbar';       
    let icon = 'check_circle';
    this.mensaje(css,  msg, icon)

  }
}
