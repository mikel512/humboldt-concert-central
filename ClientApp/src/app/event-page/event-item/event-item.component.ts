import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit, AfterViewInit {
  @Input() event: EventConcert;
  isInVenueDetail: boolean;

  constructor() { }

  ngOnInit(): void {
    this.event.flyer = "../../../../assets/sample-flyer.jpg"
  }

  ngAfterViewInit() {
  }


}
