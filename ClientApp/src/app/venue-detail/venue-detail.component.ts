import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Venue } from '../../interface/venue';
import { EventConcert } from '../../interface/eventconcert';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  @ViewChild('eventTab') eventTab: ElementRef;
  @ViewChild('infoTab') infoTab: ElementRef;
  @ViewChild('events') event: ElementRef;
  @ViewChild('info') info: ElementRef;
  private route: ActivatedRouteSnapshot;
  private venueId: string = '';
  private venue: Venue;
  private concerts: EventConcert[] = [];

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.venueId = this.route.params['venueId'];

    // get corresponding venue's events
    http.get<EventConcert[]>(baseUrl + 'Concert/' + this.venueId + '/true').subscribe(result => {
      this.concerts = result;
      console.log(this.concerts);
    }, error => console.log('error'));
    // get venue details
    http.get<Venue>(baseUrl + 'Venue/' + this.venueId).subscribe(result => {
      this.venue = result;
    }, error => console.log('error'));

  }

  ngOnInit(): void {
  }

  onEventTabClick(): void {
    let eTab = this.eventTab.nativeElement;
    eTab.classList.add('active');
    let iTab = this.infoTab.nativeElement;
    iTab.classList.remove('active');
    let infoContent = this.info.nativeElement;
    infoContent.classList.remove('active');
    let eventContent = this.event.nativeElement;
    eventContent.classList.add('active');
  }

  onInfoTabClick(): void {
    let eTab = this.eventTab.nativeElement;
    eTab.classList.remove('active');
    let iTab = this.infoTab.nativeElement;
    iTab.classList.add('active');
    let infoContent = this.info.nativeElement;
    infoContent.classList.add('active');
    let eventContent = this.event.nativeElement;
    eventContent.classList.remove('active');

  }
}
