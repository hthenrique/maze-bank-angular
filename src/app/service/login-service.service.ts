import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user/user";
import {Observable} from "rxjs";
import {ServiceResponse} from "../model/service/service-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseUrl= `${environment.baseUrl}`;

  constructor(private httpClient: HttpClient) { }

  loginUser(user:User):Observable<any>{
    return this.httpClient.post<ServiceResponse>(`${environment.baseUrl}`+"/mazebank/authenticate/user", user)
  }
}
