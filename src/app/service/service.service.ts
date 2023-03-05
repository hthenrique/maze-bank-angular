import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../model/user/user";
import {catchError, map, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {CreateUser} from "../model/create-user/create-user";
import {SuccessResponse} from "../model/response/success-response";
import {ErrorTemplate} from "../model/response/error-template";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl= `${environment.baseUrl}`;

  constructor(private httpClient: HttpClient) { }

  loginUser(user:User):Observable<SuccessResponse | ErrorTemplate>{
    return this.httpClient.post<any>(this.baseUrl + "/mazebank/authenticate/user", user, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200 || response.status === 201) {
          const successResponse = new SuccessResponse();
          successResponse.code = response.body.code;
          successResponse.message = response.body.response.message;
          return successResponse;
        } else {
          const errorTemplate = new ErrorTemplate();
          errorTemplate.errorCode = response.body.errorCode;
          errorTemplate.errorMessage = response.body.errorMessage;
          errorTemplate.timeStamp = response.body.timeStamp;
          return errorTemplate;
        }
      })
      );
  }

  createUser(create: CreateUser):Observable<SuccessResponse | ErrorTemplate>{
    return this.httpClient.post<any>(this.baseUrl + "/mazebank/management/create", create, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200 || response.status === 201) {
          const successResponse = new SuccessResponse();
          successResponse.code = response.body.code;
          successResponse.message = response.body.response.message;
          return successResponse;
        } else {
          const errorTemplate = new ErrorTemplate();
          errorTemplate.errorCode = response.body.errorCode;
          errorTemplate.errorMessage = response.body.errorMessage;
          errorTemplate.timeStamp = response.body.timeStamp;
          return errorTemplate;
        }
      })
    );
  }
}
