import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from "rxjs";
@Injectable()
export class WeatherService {

  constructor(public http: HttpClient) {
    console.log('open weather service connected');
   }

   getPost() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(map(res => res));
      }


      getWeatherDetails() {
        return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&units=metric&appid=0096b809430b4da65543e5a54a4c149e').pipe(map(res => res));
      }

      getCityWeather() {
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?q={user.city}&appid={0096b809430b4da65543e5a54a4c149e}').pipe(map(res => res));
      }
}
