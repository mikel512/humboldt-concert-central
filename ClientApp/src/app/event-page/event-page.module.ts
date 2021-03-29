import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page.component';
import { EventItemComponent } from './event-item/event-item.component';


const routes: Routes = [
  { path: '', component: EventPageComponent }
];

@NgModule({
  declarations: [EventPageComponent, EventItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EventPageModule { }
