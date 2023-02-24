import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { WeatherService } from "../../services/weather.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-weather-api',
  templateUrl: './weather-api.component.html',
  styleUrls: ['./weather-api.component.css'],
  providers: [ WeatherService, HttpClientModule, HttpClient],
})
export class WeatherApiComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  title = 'API Météo';

  constructor(private weatherService:WeatherService){
  }
  ngOnInit(){
    this.getLocation();

   /* this.weatherservice.getWeatherDetails().subscribe((data)=>{

      console.log(data.list);
      // this.details=data['list'];

      for(let i=0;i<data.list.length;i+=8)
      {
        this.details.push(data.list[i]);
      }
      this.city=data['city'].name;
      this.country=data['city'].country;
    });

    this.weatherservice.getCityWeather().subscribe((data) =>{

    })*/
  }

  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCords({lat: this.lat, lon: this.lon}).subscribe(data=>{
          this.weather = data;
        })
      })
    }
  }

  getCity({city}: { city: any }){
    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>{
      this.weather = data;
    })
  }
}
