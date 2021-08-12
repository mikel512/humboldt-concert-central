import { Component, Input, OnInit } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';

@Component({
  selector: 'app-event-desktop',
  templateUrl: './event-desktop.component.html',
  styleUrls: ['./event-desktop.component.css']
})
export class EventDesktopComponent implements OnInit {
  @Input() dataDesk: EventConcert;

  constructor() { }

  ngOnInit(): void {
  }

}
