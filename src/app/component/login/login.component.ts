import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import {LoginServiceService} from "../../service/login-service.service";
import {ServiceResponse} from "../../model/service/service-response";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginTitle: string = 'Login';
  subTitle: string = 'Log in to enter the platform.';
  usernameHint: string = 'Document number';
  userpassHint: string = 'Password';
  forgotPass: string = 'Forgot password?';
  loginButtonHint: string = 'Enter';
  errorMessage: string = '';

  errorMessageId: boolean = false;

  user:User = new User();
  serviceResponse:ServiceResponse = new ServiceResponse();


  constructor(@Inject(DOCUMENT) document: Document, private router: Router, private loginService:LoginServiceService) {

  }

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['main']);
  }

  userLogin(){
    this.loginService.loginUser(this.user).subscribe((response:ServiceResponse) =>{

      this.serviceResponse = response;
      if (this.serviceResponse.message == "Success"){
        this.goToPage();
      }
      if (this.serviceResponse.message == "Fail"){

        this.errorMessageId = true;

        this.errorMessage = this.serviceResponse.message;
      }
      console.log(response)
    });
  }

  goToPage(){
    this.router.navigate(['/main']);
  }

}
