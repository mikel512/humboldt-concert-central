import { Component, Input, OnInit } from '@angular/core';
import { Venue } from '../../../interface/venue';

@Component({
  selector: 'app-venue-item',
  templateUrl: './venue-item.component.html',
  styleUrls: ['./venue-item.component.css']
})
export class VenueItemComponent implements OnInit {
  @Input() venue: Venue;

  constructor() { 
  }

  ngOnInit(): void {
    // this.venue.picture = "../../../../assets/stock-venue.jpg"
  }

}
