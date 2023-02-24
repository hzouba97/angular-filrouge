import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: 'app-weather-api',
  templateUrl: './weather-api.component.html',
  styleUrls: ['./weather-api.component.css'],
  providers: [ WeatherService, HttpClientModule, HttpClient],
})
export class WeatherApiComponent {

  title = 'API Météo';
  city!:String;
  country!:String;
  details:any[] = [];
  chart:any;
  ville: any;
  constructor(private weatherservice:WeatherService){
    console.log("constructor called");
  }
  ngOnInit(){
    this.weatherservice.getWeatherDetails().subscribe((data)=>{

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

    })
  }

}
