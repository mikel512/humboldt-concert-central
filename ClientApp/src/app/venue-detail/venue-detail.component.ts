import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Venue } from '../../interface/venue';

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

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.venueId = this.route.params['venueId'];
    console.log(this.venueId);
    http.get<Venue>(baseUrl + 'Venue/' + this.venueId).subscribe(result => {
      this.venue = result;
      this.venue.venueName = 'Arcata Theater Lounge';
      this.venue.description = 'Since reopening as a mixed-use venue, the Arcata Theatre Lounge has become the focal point for entertainment in the small community of Arcata. Since 2010 the bar has a full liquor license. Current occupancy guidelines allow up to 618 attendees depending on the configuration. Alongside movie showings, the venue has seen diverse music acts including Riff Raff, Odesza, Troyboi, and GRiZ';
      this.venue.address = '1036 G St, Arcata, CA 95521';
      this.venue.ticketsLink = 'https://www.arcatatheatre.com/';
      this.venue.menuLink = 'https://www.arcatatheatre.com/couxp-menu'
      console.log(this.venue);
    }, error => console.error(error))
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
