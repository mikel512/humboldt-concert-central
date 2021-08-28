import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventConcert } from '../../interface/eventconcert';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(50, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
    ])
  ]
})
export class EventPageComponent implements OnInit, AfterViewInit {
  private events: EventConcert[] = [];
  private route: ActivatedRouteSnapshot;
  private currentCity: string = '';
  private citiesDropdown: string[] = ['Arcata', 'Eureka', 'All'];

  private staggeringEvents: EventConcert[] = [];
  private next: number = 0;

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.currentCity = this.route.params['city'];
    this.citiesDropdown = this.citiesDropdown.filter(e => e !== this.currentCity);

    if (this.currentCity === 'All') {

      http.get<EventConcert[]>(baseUrl + 'concert').subscribe(result => {
        this.events = result;
        this.doNext();
      }, error => console.error(error));
    } else {

      http.get<EventConcert[]>(baseUrl + 'concert/city/' + this.currentCity).subscribe(result => {
        this.events = result;
        this.doNext();
      }, error => console.error(error));
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  doNext() {
    if(this.next <this.events.length) {
      this.staggeringEvents.push(this.events[this.next++]);
    }
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
