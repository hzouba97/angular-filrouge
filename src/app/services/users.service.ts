import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<any>{
    return this.http.get<Users[]>('http://localhost:8080/api/users',{ responseType: 'json' });
  }

  fetchUsersById(id: number): Observable<Users>{
    return this.http.get<Users>(`http://localhost:8080/api/users/${id}`);
  }

  createUsers(createUsers: any):Observable<void>{
    return this.http.post<void>('http://localhost:8080/api/users/add',createUsers);
  }

  editUser(user: Users): Observable<Users>{

    const data: Users = {
      id: user.id,
      admin:  user.admin,
      username:  user.username,
      firstname:  user.firstname,
      lastname:  user.lastname,
      mail:  user.mail,
      password:  user.password,
      activate:  user.activate,
      ville:  user.ville,
      gender:  user.gender,
      birthdate:  user.birthdate,
      phone:  user.phone


    }
    return this.http.put<Users>(`http://localhost:8080/api/users/${user.id}`, data);
  }



}
