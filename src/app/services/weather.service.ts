import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class WeatherService {

  url = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather';
  apiKey = '0096b809430b4da65543e5a54a4c149e';

  constructor(public http: HttpClient) {
  }

  getWeatherDataByCords({lat, lon}: { lat: any, lon: any }) {
    let headers = new HttpHeaders()
      .set('skip', 'true')
      .set('X-Requested-With', 'XMLHttpRequest');

    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, {params, headers});
  }

  getWeatherDataByCityName(city: string) {
    let headers = new HttpHeaders()
      .set('skip', 'true')
      .set('X-Requested-With', 'XMLHttpRequest');

    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apiKey)

    return this.http.get(this.url, {params, headers});
  }
}
