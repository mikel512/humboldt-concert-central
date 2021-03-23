import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VenuesPageComponent } from './venues-page.component';
import { VenueItemComponent } from './venue-item/venue-item.component';


const routes: Routes = [
  { path: '', 
    component: VenuesPageComponent ,
  }
];

@NgModule({
  declarations: [VenuesPageComponent, VenueItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class VenuesPageModule { }
