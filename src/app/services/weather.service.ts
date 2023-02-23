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
        return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast?q=Paris,fra&units=metric&appid=1ffaa80ea2d33fe521d4f7f22167adcf').pipe(map(res => res));
      }
}
