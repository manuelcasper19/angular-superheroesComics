import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerHeroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-confirmar-borrar',
  templateUrl: './confirmar-borrar.component.html',
  styleUrls: ['./confirmar-borrar.component.css']
})
export class ConfirmarBorrarComponent implements OnInit {

  constructor(private dialogRef  : MatDialogRef<ConfirmarBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VerHeroe) { }

  ngOnInit(): void {
  }


  borrar(){
    this.dialogRef.close(true);

  }

  cerrar(){
    this.dialogRef.close();

  }
}
