import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventConcert } from '../../interface/eventconcert';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit, AfterViewChecked {
  private events: EventConcert[] = [];
  private route: ActivatedRouteSnapshot;
  private currentCity: string = '';
  private citiesDropdown: string[] = ['Arcata', 'Eureka', 'All'];

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.currentCity = this.route.params['city'];
    this.citiesDropdown = this.citiesDropdown.filter(e => e !== this.currentCity);

    if (this.currentCity === 'All') {

      http.get<EventConcert[]>(baseUrl + 'concert').subscribe(result => {
        this.events = result;
      }, error => console.error(error));
    } else {

      http.get<EventConcert[]>(baseUrl + 'concert/city/' + this.currentCity).subscribe(result => {
        this.events = result;
      }, error => console.error(error));
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
  }

  navVenues() {
    let val = 'venues/' + this.currentCity;
    this.router.navigate([val]);
  }

  navigateTo(value) {
    if (value) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([value]));
    }
  }

}
