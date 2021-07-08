import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Venue } from '../../interface/venue';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
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
      console.log(this.venue);
    }, error => console.error(error))
  }


  ngOnInit(): void {
  }

}
