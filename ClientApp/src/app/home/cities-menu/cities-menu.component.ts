import { Component, OnInit } from '@angular/core';
import { ICity } from '../../../interface/icity';

@Component({
  selector: 'app-cities-menu',
  templateUrl: './cities-menu.component.html',
  styleUrls: ['./cities-menu.component.css']
})
export class CitiesMenuComponent implements OnInit {
  cities : ICity[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    let obj1: ICity = {
      CityImg: "../../../../assets/Banner-2019-10-09_PGE-PSPS-Outage-ArcataPlaza.jpg",
      CityName: 'Arcata'
    }
    let obj2: ICity = {
      CityImg: "../../../../assets/Old-Town-Night-Ranario-web.jpg",
      CityName: 'Eureka'
    }
    this.cities.push(obj1);
    this.cities.push(obj2);
  }

}
