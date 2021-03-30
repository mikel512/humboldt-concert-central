import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { EventConcert } from '../../../interface/eventconcert';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit, AfterViewInit {
  @ViewChild('rowDiv') row: ElementRef;
  @ViewChild('imgDiv') img: ElementRef;
  @ViewChild('bodyDiv') body: ElementRef;
  @Input() event: EventConcert;

  constructor() { }

  ngOnInit(): void {
    this.event.flyer = "../../../../assets/sample-flyer.jpg"
  }

  ngAfterViewInit() {
    this.mobileCheck();
  }


  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.mobileCheck();
  }

  addHorizontal() {
    let elRow = this.row.nativeElement;
    let elImg = this.img.nativeElement;
    let elBody = this.body.nativeElement;
    elRow.classList.add('row');
    elRow.classList.add('g-0');
    elImg.classList.add('col-4');
    elImg.classList.add('img-col');
    elBody.classList.add('col-8');
    elBody.classList.add('card-body-col');
  }

  removeHorizontal() {
    let elRow = this.row.nativeElement;
    let elImg = this.img.nativeElement;
    let elBody = this.body.nativeElement;
    elRow.classList.remove('row');
    elRow.classList.remove('g-0');
    elImg.classList.remove('col-4');
    elImg.classList.remove('img-col');
    elBody.classList.remove('col-8');
    elBody.classList.remove('card-body-col');

  }

  mobileCheck() {
    var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.addHorizontal();
    } else {
      this.removeHorizontal();
    }

  }

}
