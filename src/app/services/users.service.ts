import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<any> {
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }

  fetchUsersById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/users/${id}`, {responseType: 'json'});
  }

  editUser(user: User): Observable<User> {

    const data: User = {
      id: user.id,
      admin: user.admin,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      mail: user.mail,
      password: user.password,
      activate: user.activate,
      ville: user.ville,
      gender: user.gender,
      birthdate: user.birthdate,
      phone: user.phone


    }
    return this.http.put<User>(`http://localhost:8080/api/users/${user.id}`, data);
  }


}
