import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {User} from "../reducers";


const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: "root"
})
export class Auth {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }


  authRegister(val: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, val);
  }

  authLogin(val: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, val);
  }

  updateSettingOfUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user.userId}`, user)
  }

  getUser(user: any) {
    return this.http.get<any>(`${this.baseUrl}/users/${user.userId}`);
  }

}

