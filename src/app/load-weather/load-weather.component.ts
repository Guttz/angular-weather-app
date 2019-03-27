import { Component, OnInit } from '@angular/core';

//Services used 
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
  //Address control variables
  public addressInput: string = "Loadsmart";
  public errorComponent = {show: false, msg: "Sorry, our platform doesn't support this address"}
  
  public infoCard = {address: {city: "New York", state: "NY", country: "United States"}, temp: 70}
  public weatherSearches: SearchModel[];
  public displayedColumns: string[] = ['date', 'address', 'weather', 'icon'];


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

  public processSearch(address: any){
    console.log(address);

    var processedInfo = this.processAddress(address);

    console.log(processedInfo);

    this.errorComponent.show = false;
    if(processedInfo.zipCode == ""){
      this.errorComponent.show = true;
      this.errorComponent.msg = "Invalid Adress. Please provide a more specific address";
      return
    }else if(processedInfo.countryCode == ""){
      this.errorComponent.show = true;
      this.errorComponent.msg = "This country is not supported by our platform";
      return
    }

    this.weatherService.getWeather(processedInfo.zipCode, processedInfo.countryCode).subscribe((weatherData) => {
      //do what I have to do in the UI, show the weather or ask for more info for example
      this.infoCard.address = processedInfo.formattedAddress;
      this.infoCard.temp = weatherData.temp;

      var newSearch = <SearchModel>{date: new Date(),
        address: processedInfo.formattedAddress.city + ", " + processedInfo.formattedAddress.state
        + " - " + processedInfo.formattedAddress.country,
        weather: weatherData.temp, icon: weatherData.icon};
      
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
  
  public searchWeather(){
    this.errorComponent.show = true;
    this.errorComponent.msg = "Invalid Adress. Please provide a more specific address";
  }

  public processAddress(address: any) {
    var zipCode: string = "";
    var countryCode: string = "";
    var formattedAddress = {city: "", state: "", country: ""};

    console.log("LAT: " + address['geometry']['location'].lat() + "LONG: " + address['geometry']['location'].lng())
    for( let results of address['address_components']){
      
      if(results['types'].indexOf('postal_code') > -1){
        zipCode = results['short_name'];
      }
      else if(results['types'].indexOf('country') > -1){
        countryCode = results['short_name'];
        formattedAddress['country'] = results['long_name'];
      }
      else if(results['types'].indexOf('locality') > -1){
        formattedAddress['city'] = results['long_name'];
      }
      else if(results['types'].indexOf('administrative_area_level_1') > -1){
        formattedAddress['state'] = results['short_name'];
      }
    }

    
    return {"zipCode": zipCode, "countryCode": countryCode, "formattedAddress": formattedAddress}
  }

}
