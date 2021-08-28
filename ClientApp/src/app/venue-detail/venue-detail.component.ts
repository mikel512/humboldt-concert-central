import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Venue } from '../../interface/venue';
import { EventConcert } from '../../interface/eventconcert';
import { animate, style, transition, trigger } from '@angular/animations';
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
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
    private overlayService: SpinnerOverlayService,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.venueId = this.route.params['venueId'];

    // get venue details
    http.get<Venue>(baseUrl + 'Venue/' + this.venueId).subscribe(result => {
      this.venue = result;
    }, error => console.log('error'));
    // get corresponding venue's events
    overlayService.hide();
    http.get<EventConcert[]>(baseUrl + 'Concert/' + this.venueId + '/true').subscribe(result => {
      this.concerts = result;
    }, error => console.log(error));

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
