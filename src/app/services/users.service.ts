import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<Users[]>{
    return this.http.get<Users[]>('http://localhost:8080/api/users');
  }

}
