import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItemComponent } from './event-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EventItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [EventItemComponent]
})
export class EventItemModule { }