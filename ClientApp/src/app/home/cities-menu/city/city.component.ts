import { Component, Input, OnInit } from '@angular/core';
import { ICity } from '../../../../interface/icity';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() cityObj: ICity;

  constructor() { }

  ngOnInit(): void {
  }

}
