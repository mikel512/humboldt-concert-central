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
  private city: string = '';

  constructor(private actRouter: ActivatedRoute,
    private router: Router,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.route = actRouter.snapshot;
    this.city = this.route.params['city'];
    http.get<Venue[]>(baseUrl + 'venue/city/' + this.city).subscribe(result => {
      this.venues = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
    console.log(this.venues);
  }
  
  navigateTo(value) {
    console.log(value);
    if(value) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([value]));
    }
  }

}
