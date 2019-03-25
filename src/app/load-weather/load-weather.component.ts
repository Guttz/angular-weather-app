import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service'

//Data models used
import { WeatherModel } from "./../models/WeatherModel";
import { SearchModel } from "./../models/SearchModel";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];

@Component({
  selector: 'app-load-weather',
  templateUrl: './load-weather.component.html',
  styleUrls: ['./load-weather.component.scss']
})
export class LoadWeatherComponent implements OnInit {
  public addressInput: string = "";

  public displayedColumns: string[] = ['date', 'address', 'weather', 'icon'];
  public dataSource = ELEMENT_DATA;

  public weatherSearches: SearchModel[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getSearches().subscribe((data) => {
      this.weatherSearches = <SearchModel[]>data;
      console.log(this.weatherSearches);
    })

    this.weatherService.getWeather("88000-000", "br").subscribe((data) => {
      console.log(data);
    })

    var newSearch = <SearchModel>{
      "address": "New York City, NY",
      "date": new Date(),
      "icon": "04d",
      "weather": 73
    }

    //this.weatherService.postSearches(newSearch).subscribe((data) => {
    //  console.log(data);
    //})
  }

  public getSearches(){

  }

  public postSearches(){
    
  }
  
  public getWeather(){

  }


}
