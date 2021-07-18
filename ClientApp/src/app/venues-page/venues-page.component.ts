import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Venue } from '../../interface/venue';

@Component({
  selector: 'app-venues-page',
  templateUrl: './venues-page.component.html',
  styleUrls: ['./venues-page.component.css']
})
export class VenuesPageComponent implements OnInit {
  private venues: Venue[] = [];
  private route: ActivatedRouteSnapshot;
  private currentCity: string = '';
  private citiesDropdown: string[] = ['Arcata', 'Eureka', 'All'];

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.route = actRouter.snapshot;
    this.currentCity = this.route.params['city'];
    this.citiesDropdown = this.citiesDropdown.filter(e => e!== this.currentCity);

    if(this.currentCity === 'All') {

      http.get<Venue[]>(baseUrl + 'venue').subscribe(result => {
        this.venues = result;
        console.log(this.venues);
      }, error => console.error(error));
    } else {

      http.get<Venue[]>(baseUrl + 'venue/city/' + this.currentCity).subscribe(result => {
        this.venues = result;
        console.log(this.venues);
      }, error => console.error(error));
    }

  }

  ngOnInit(): void {
  }

  eventsNav() {
    this.router.navigate([this.currentCity]);
  }
  
  navigateTo(value) {
    value = 'venues/' + value;
    if(value) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([value]));
    }
  }

}
