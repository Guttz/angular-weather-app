import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service'

//Data models used
import { WeatherModel } from "./../models/WeatherModel";
import { SearchModel } from "./../models/SearchModel";

@Component({
  selector: 'app-load-weather',
  templateUrl: './load-weather.component.html',
  styleUrls: ['./load-weather.component.scss']
})
export class LoadWeatherComponent implements OnInit {
  public addressInput: string = "Loadsmart";
  public infoCard = {address: "New York City, NY", temp: 70}
  public weatherSearches: SearchModel[];
  public displayedColumns: string[] = ['date', 'address', 'weather', 'icon'];

  constructor(private weatherService: WeatherService) { }

  //@ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
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

  public processSearch(address: any){
    console.log(address);

    var processedInfo = this.processAddress(address);

    console.log(processedInfo);

    if(processedInfo.zipCode == "" || processedInfo.countryCode == ""){
      //Show message asking for user to be specific
      return
    }

    this.weatherService.getWeather(processedInfo.zipCode, processedInfo.countryCode).subscribe((weatherData) => {
      
      //do what I have to do in the UI, show the weather or ask for more info for example
      
      this.infoCard.address = processedInfo.formattedAddress;
      this.infoCard.temp = weatherData.temp;

      var newSearch = <SearchModel>{date: new Date(), address: processedInfo.formattedAddress, weather: weatherData.temp, icon: weatherData.icon};
      
      var updatedWeatherSearches = this.weatherSearches.slice()
      updatedWeatherSearches.unshift(newSearch);
      this.weatherSearches = updatedWeatherSearches;

      //this.weatherService.postSearches(newSearch).subscribe((postedSearch) => {
      //  console.log(postedSearch);
      //})

    })
    
  }

  public getSearches(){

  }

  public postSearches(newSearch: SearchModel): void{
    this.weatherService.postSearches(newSearch).subscribe((data) => {
     console.log(data);
    })
  }
  
  public processAddress(address: any) {
    var zipCode: string = "";
    var countryCode: string = "";
    var formattedAddress: string = address['formatted_address'];

    console.log("LAT: " + address['geometry']['location'].lat() + "LONG: " + address['geometry']['location'].lng())
    for( let results of address['address_components']){
      
      if(results['types'].indexOf('postal_code') > -1){
        zipCode = results['short_name'];
      }
      if(results['types'].indexOf('country') > -1){
        countryCode = results['short_name'];
      }
    }

    
    return {"zipCode": zipCode, "countryCode": countryCode, "formattedAddress": formattedAddress}
  }

}
