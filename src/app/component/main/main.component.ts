import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FetchUserResponse} from "../../model/response/fetch/fetch-user-response";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  balance: string;
  username: string;
  userEmail: string | null;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private mainService:ServiceService) {
    this.userEmail = '';
    this.username = '';
    this.balance = ''
  }

  ngOnInit(): void{
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation ? currentNavigation.extras.state : window.history.state;
    if (state && state.email) {
      this.userEmail = state.email;
      if (this.userEmail != null) {
        this.fetchUserOnService(this.userEmail);
      }
    }
  }

  fetchUserOnService(userEmail: string){
    this.mainService.fetchUser(userEmail).subscribe(
      response => {
        console.log("Resposta: ", response);
        if (response instanceof FetchUserResponse) {
          this.username = response.userName;
          this.balance = response.userBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }
      },
      error => {
        console.log("Erro na solicitação: ", error);
      }
    );
  }

}
