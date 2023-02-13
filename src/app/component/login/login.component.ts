import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  errorMessage: string = 'Invalid Credentials';

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(['main']);
  }

  goToPage(){
    this.router.navigate(['/main']);
  }

}
