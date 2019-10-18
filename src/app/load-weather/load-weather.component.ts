import { Component, OnInit } from '@angular/core';

// Services used
import { WeatherService } from './../services/weather.service'

// Data models used
import { WeatherModel } from './../models/WeatherModel';
import { SearchModel } from './../models/SearchModel';

@Component({
  selector: 'app-load-weather',
  templateUrl: './load-weather.component.html',
  styleUrls: ['./load-weather.component.scss']
})
export class LoadWeatherComponent implements OnInit {
  // Address control variables
  public addressInput: string = 'Berlin, Deutschland';
  public errorComponent = {
    show: false,
    msg: "Sorry, our platform doesn't support this address"
  }

  // Card control variables
  public infoCard = {
    address:{
      city: "New York",
      state: "NY",
      country: "United States",
      fullAddress: "459 Broadway, New York, NY 10013, USA"
    },
      temp: 38.57};

  // Table control variables
  public weatherSearches: SearchModel[] = null;
  public displayedColumns: string[] = ['date', 'address', 'weather', 'icon'];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getSearches();
  }

  public processSearch(address: any) {
    this.errorComponent.show = false;
    const processedInfo = this.processAddress(address);

    const cacheCheck = this.checkCache(processedInfo);
    if (cacheCheck) {
      const cachedValue = cacheCheck;
      this.infoCard.temp = cachedValue.weather;
      this.infoCard.address = processedInfo.formattedAddress;
      return;
    }

    if (processedInfo.zipCode === '') {
      const lat = address['geometry']['location'].lat();
      const lng = address['geometry']['location'].lng();

      this.weatherService.getAddress(lat, lng).subscribe( (places) => {
        this.processSearch(places.results[0]);
      })
      return null;
    } else if (processedInfo.countryCode === '') {
      this.errorComponent.show = true;
      this.errorComponent.msg = 'This country is not supported by our platform';
      return null;
    }

    this.weatherService.getWeather(processedInfo.zipCode, processedInfo.countryCode)
    .subscribe((weatherData) => {
      this.infoCard.temp = weatherData.temp;
      this.infoCard.address = processedInfo.formattedAddress;

      const newSearch = <SearchModel>{date: new Date(),
        address: processedInfo.formattedAddress.city + ', ' +
        processedInfo.formattedAddress.state,
        weather: weatherData.temp,
        icon: 'assets/weather-icons/' + weatherData.icon + '.png'};


      const updatedWeatherSearches = this.weatherSearches.slice();
      updatedWeatherSearches.unshift(newSearch);
      this.weatherSearches = updatedWeatherSearches;

      this.postSearches(newSearch);
    },
    (err) => {
      this.errorComponent.show = true;
      this.errorComponent.msg = "This location is not support by our Weather Provider";
    });
  }

  public getSearches() {
    this.weatherService.getSearches().subscribe((data) => {
      this.weatherSearches = <SearchModel[]>data;
      console.log(this.weatherSearches);
    });
  }

  public postSearches(newSearch: SearchModel): void {
    this.weatherService.postSearches(newSearch).subscribe((data) => {
      console.log(data);
    });
  }

  public searchWeather(){
    this.errorComponent.show = true;
    this.errorComponent.msg = "Invalid Adress. Please provide a more specific address";
  }

  public processAddress(address: any) {
    let zipCode: string = "";
    let countryCode: string = "";
    const formattedAddress = {city: "", state: "", country: "",
                            fullAddress : address['formatted_address']};

    for ( let results of address['address_components'] ){

      if (results['types'].indexOf('postal_code') > -1) {
        zipCode = results['short_name'];
      } else if (results['types'].indexOf('country') > -1) {
        countryCode = results['short_name'];
        formattedAddress['country'] = results['long_name'];
      } else if (results['types'].indexOf('locality') > -1) {
        formattedAddress['city'] = results['long_name'];
      } else if (results['types'].indexOf('administrative_area_level_1') > -1) {
        formattedAddress['state'] = results['short_name'];
      }
    }

    return {"zipCode": zipCode, "countryCode": countryCode,
            "formattedAddress": formattedAddress};
  }

  public checkCache(addressObject){
    const currentDate = (new Date()).getTime();
    const cacheTime = 3600000;

    for(let weatherLog of this.weatherSearches){
      const formattedAddress = addressObject.formattedAddress.city + ", " +
      addressObject.formattedAddress.state;

      if(weatherLog.address == formattedAddress){
        let weatherLogMiliseconds = (new Date(weatherLog.date).getTime());
        let timeGap = currentDate - weatherLogMiliseconds;
        if(timeGap < cacheTime){
          return weatherLog;
        }
      }
    }

    return null;
  }

}
