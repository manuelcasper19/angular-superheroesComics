import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbars',
  templateUrl: './snackbars.component.html',
  styles: [
    `
    .centrar {
      align-items: center;
      display: flex;

    justify-content: center;
  

    }
    `
  ]
})
export class SnackbarsComponent implements OnInit {
  // get getIcon() {
  //   switch (this.data.snackType) {
  //     case 'success':
  //       return {type: this.data.snackType, icon: 'check'};
  //     case 'error':
  //       return {type: this.data.snackType, icon: 'faults'};
  //     case 'warn':
  //       return {type: this.data.snackType, icon: 'warning_outline'};
  //     case 'info':
  //       return {type: this.data.snackType, icon: 'info'};
  //   }
  //   return ''
  // }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  
   }




  ngOnInit(): void {
  }

  closeSnackbar() {
    this.data.snackBar.dismiss();
  }

}
