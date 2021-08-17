import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';

@Component({
  selector: 'app-event-desktop',
  templateUrl: './event-desktop.component.html',
  styleUrls: ['./event-desktop.component.css']
})
export class EventDesktopComponent implements OnInit,AfterViewInit {
  @Input() dataDesk: EventConcert;
  displayDate: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var values = this.dataDesk.eventDate.split(',');
    console.log(values);
    this.displayDate = values[1];

  }

}
