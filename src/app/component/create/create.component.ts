import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CreateUser} from "../../model/create-user/create-user";
import {ServiceService} from "../../service/service.service";
import {SuccessResponse} from "../../model/response/success/success-response";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  createTitle: string;
  createButtonHint: string;
  userError:string;
  userEmailError:string;
  passError:string;
  confirmPassError:string;

  serverErrorMessage: string;

  errorMessageId: boolean = false;

  btnstate: boolean = false;
  loading!: HTMLElement;

  createUser: CreateUser = new CreateUser();

  ngOnInit() {
    this.loading = document.getElementById('loading')!;
    this.loading.style.display = 'none';
  }

  constructor(private router: Router, private service:ServiceService) {
    this.createTitle = 'Create your user';
    this.createButtonHint = 'Create';
    this.userError = '';
    this.userEmailError = '';
    this.passError = '';
    this.confirmPassError = '';
    this.serverErrorMessage = '';
  }

  submitCreateUser(){

    let valid = this.verifyUser(this.createUser);
    if (valid){
      this.loading.style.display = 'block';
      this.btnstate = true;
      this.sendRequest(this.createUser);
    }
  }

  verifyUser(create: CreateUser): boolean{

    let valid = true

    this.userError = '';
    this.passError = '';
    this.userEmailError = '';
    this.confirmPassError = '';

    if (create != null){
      if (create.username == null ){
        this.userError = "Username must not empty";
        valid = false;
      }
      if (create.useremail == null){
        this.userEmailError = "Email must not empty";
        valid = false;
      }
      if (create.userpass == null ){
        this.passError = "Password must not empty";
        valid = false;
      }
      if (create.userpass != null && create.userpass != create.confirmPass){
        this.passError = "Password not matches";
        this.confirmPassError = "Password not matches";
        valid = false;
      }
    }else {
      this.userError = "Username must not empty";
      this.userEmailError = "Email must not empty";
      this.passError = "Password must not empty";
      this.confirmPassError = "Password confirmation must not empty";
      return false;
    }

    return valid;
  }

  sendRequest(createUser: CreateUser){
    this.serverErrorMessage = '';
    this.service.createUser(createUser).subscribe(
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
    this.router.navigate(['/login']);
  }

}
