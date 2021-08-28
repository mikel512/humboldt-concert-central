import { Component, Input, OnInit } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-event-desktop',
  templateUrl: './event-desktop.component.html',
  styleUrls: ['./event-desktop.component.css']
})
export class EventDesktopComponent implements OnInit {
  @Input() dataDesk: EventConcert;
  displayDate: string;
  abnormalStatus: boolean = false;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var values = this.dataDesk.dateFormatted.split(',');
    this.displayDate = values[1];
    console.log(this.dataDesk);
    this.checkStatus();
    console.log(this.abnormalStatus);
  }

  flyerURL() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.dataDesk.flyer)
  }

  checkStatus() {
    if(this.dataDesk.status === '' || this.dataDesk.status === null) {
    } else {
      this.abnormalStatus = true;
    }
  }

}
