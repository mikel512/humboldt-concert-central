import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page.component';
import { EventItemModule } from '../event-item/event-item.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: EventPageComponent }
];

@NgModule({
  declarations: [EventPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EventItemModule,
  ]
})
export class EventPageModule { }
