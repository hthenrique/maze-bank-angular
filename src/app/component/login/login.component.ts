import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import {ServiceService} from "../../service/service.service";
import {DOCUMENT} from "@angular/common";
import {SuccessResponse} from "../../model/response/success/success-response";
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginTitle: string;
  subTitle: string;
  usernameHint: string;
  userpassHint: string;
  userError:string;
  passError:string;
  createAccount: string;
  loginButtonHint: string;
  serverErrorMessage: string;
  errorMessageId: boolean = false;
  btnstate: boolean = false;
  loading!: HTMLElement;

  user:User = new User();


  constructor(@Inject(DOCUMENT) document: Document, private router: Router, private loginService:ServiceService) {
    this.loginTitle = 'Login';
    this.subTitle = 'Log in to enter the platform.';
    this.usernameHint = 'Email';
    this.userpassHint = 'Password';
    this.userError = '';
    this.passError = '';
    this.createAccount = 'Create your account';
    this.loginButtonHint = 'Enter';
    this.serverErrorMessage = '';
  }

  ngOnInit() {
    this.loading = document.getElementById('loading')!;
    this.loading.style.display = 'none';
  }

  userLogin(){
    let verified = this.verifyUser(this.user);

    if (verified){
      this.loading.style.display = 'block';
      this.btnstate = true;
      this.sendRequest(this.user)
    }
  }

  verifyUser(user: User): boolean{

    this.userError = '';
    this.passError = '';

    if (user == null){
      this.userError = 'Error user';
      this.passError = 'Error pass';
      return false;
    }else {
      if (user.username == null){
        this.userError = 'Error user';
        return false;
      }

      if (user.userpass == null || user.userpass.length < 3){
        this.passError = 'Error pass';
        return false;
      }
    }

    return true;
  }

  sendRequest(user: User): void{
    this.serverErrorMessage = '';
    this.loginService.loginUser(user).subscribe(
      response => {
        console.log("Resposta: ", response);
        if (response instanceof SuccessResponse) {
          this.goToPage();
        }
      },
      error => {
        console.log("Erro na solicitação: ", error);
        this.loading.style.display = 'none';
        this.btnstate = false;
        this.errorMessageId = true;
        this.serverErrorMessage = error.error.errorMessage;
      }
    );
  }

  goToPage(){
    const data = { email: this.user.username };
    this.router.navigate(['/main'], { state: data });
  }

}
