import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports:[
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule
    
  ]
})
export class MaterialModule { }
