import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventConcert } from '../../interface/eventconcert';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, AfterViewChecked {
  private route: ActivatedRouteSnapshot;
  private eventId: string = '';
  private event: EventConcert;

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.eventId = this.route.params['eventId'];
    http.get<EventConcert>(baseUrl + 'concert/' + this.eventId).subscribe(result => {
      this.event = result;
      this.event.eventName = 'Band Name';
      this.event.venue.venueName = 'Venue Name';
      this.event.eventDate = 'Sunday, May 16, 2021';
      this.event.eventTime = '9:00 PM';
      this.event.venue.location = 'Old Town'
      this.event.flyer = "../../../assets/sample-flyer.jpg";
      this.event.details = "Lost Dog Street Band \nDoors 7:00 PM\n $15 Advance - $19 Door\n *masks required - Covid-19 guidelines enforced*";
      this.event.price = '$15.00';
      this.event.tickets = 'https://tickets.vemos.io/-LvvzSYm6udEnGfKIRLa/arcata-theatre-lounge/-Mb7t9UH4VCQttK4wGfo/lost-dog-street-band/-Mb9V9hdBByoWE8-wEY9';
      console.log(this.event);
    }, error => console.error(error))
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
  }

}
