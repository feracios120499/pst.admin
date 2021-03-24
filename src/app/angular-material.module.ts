import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {
   MatButtonModule,
   MatToolbarModule,
   MatCardModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule,
   MatTabsModule,
   MatDialogModule,
   MatSlideToggleModule,
   MatProgressSpinnerModule,
   MatExpansionModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatTabsModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      DragDropModule
   ],
   exports: [
      MatButtonModule,
      MatTabsModule,
      MatCardModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      DragDropModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }