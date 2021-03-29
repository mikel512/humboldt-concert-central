import { Component, Input, OnInit } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() event: EventConcert;

  constructor() { }

  ngOnInit(): void {
    this.event.flyer = "../../../../assets/sample-flyer.jpg"
  }

}
