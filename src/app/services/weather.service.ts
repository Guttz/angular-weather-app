import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WeatherModel } from "./../models/WeatherModel";
import { SearchModel } from "./../models/SearchModel";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:5000';
  private API_KEY = 'AIzaSyBQTAjsIOaXGloD0Bxq44-v9pT3ldA9haw';

  constructor(private http: HttpClient) {
  }

  /** GET Searches from the server */
	public getSearches (): Observable<SearchModel[]>{
	  return this.http.get<SearchModel[]>(this.apiUrl + "/searches");
  }
 
  /** POST Searches from the server */
	public postSearches (search: SearchModel): Observable<SearchModel>{
    return this.http.post<SearchModel>(this.apiUrl + "/searches", search);
  }

  /** GET Weather from the server */
	public getWeather (zipCode: string, countryCode: string ): Observable<WeatherModel>{
    let params = new HttpParams().set("zipCode", zipCode).set("countryCode", countryCode);
    
	  return this.http.get<WeatherModel>(this.apiUrl + "/weather", { params: params });
  }

  /** GET ZipCode from a Lat and Long */
  public getAddress (lat: number, long: number ): any{
    let params = new HttpParams().set("latlng", (lat + "," + long))
    .set("key", this.API_KEY);

	  return this.http.get<any[]>("https://maps.googleapis.com/maps/api/geocode/json", { params: params });
  }
}

