import { Component, OnInit } from '@angular/core';
import { City } from '../../../interface/city';

@Component({
  selector: 'app-cities-menu',
  templateUrl: './cities-menu.component.html',
  styleUrls: ['./cities-menu.component.css']
})
export class CitiesMenuComponent implements OnInit {
  cities : City[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    let obj1: City = {
      cityId: 0,
      image: "../../../../assets/Banner-2019-10-09_PGE-PSPS-Outage-ArcataPlaza.jpg",
      cityName: 'Arcata'
    }
    let obj2: City = {
      cityId: 1,
      image: "../../../../assets/Old-Town-Night-Ranario-web.jpg",
      cityName: 'Eureka'
    }
    this.cities.push(obj1);
    this.cities.push(obj2);
  }

}
