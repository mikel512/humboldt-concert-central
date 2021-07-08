import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VenueDetailComponent } from './venue-detail.component';


const routes: Routes = [
  { path: '', component: VenueDetailComponent }
];

@NgModule({
  declarations: [VenueDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VenueDetailModule { }
