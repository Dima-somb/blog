import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class Auth {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }


  authRegister(val: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, val)
      .pipe(
        tap((user) => {
          console.log(user);
        })
      )
  }

}

