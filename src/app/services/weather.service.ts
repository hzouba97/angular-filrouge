import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {map} from "rxjs";
import { UsersService } from "./users.service";
@Injectable()
export class WeatherService {

  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '0096b809430b4da65543e5a54a4c149e';


  constructor(public http: HttpClient,
  private usersService: UsersService) {
    console.log('open weather service connected');
   }

      getWeatherDataByCords({lat, lon}: { lat: any, lon: any }){
        let params = new HttpParams()
          .set('lat', lat)
          .set('lon', lon)
          .set('units', 'metric')
          .set('appid', this.apiKey)

        return this.http.get(this.url, { params });
      }

      getWeatherDataByCityName(city: string){
        let params= new HttpParams()
          .set('q', city)
          .set('units', 'metric')
          .set('appid', this.apiKey)

        return this.http.get(this.url, { params });
      }
}
