import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-weather-api',
  templateUrl: './weather-api.component.html',
  styleUrls: ['./weather-api.component.css'],
  providers: [WeatherService, HttpClientModule, HttpClient],
})
export class WeatherApiComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  title = 'API Météo';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCords({lat: this.lat, lon: this.lon}).subscribe(data => {
          this.weather = data;
        })
      })
    }
  }

  getCity({city}: { city: any }) {
    this.weatherService.getWeatherDataByCityName(city).subscribe(data => {
      this.weather = data;
    })
  }
}
