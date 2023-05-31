import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../service/service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FetchUserResponse} from "../../model/response/fetch/fetch-user-response";
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  balance: string;
  username: string;
  userEmail: string | null;

  user: User = new User();
  fetchUser: FetchUserResponse = new FetchUserResponse();

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
    }else{
      if (state && state.fetchUser) {
        this.fetchUser = state.fetchUser;
        this.username = this.fetchUser.userName;
        this.balance = this.fetchUser.userBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      }
    }
  }

  fetchUserOnService(userEmail: string){
    this.mainService.fetchUser(userEmail).subscribe(
      response => {
        console.log("Resposta: ", response);
        if (response instanceof FetchUserResponse) {
          this.fetchUser = response
          this.username = response.userName;
          this.balance = response.userBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }
      },
      error => {
        console.log("Erro na solicitação: ", error);
      }
    );
  }


  goToPage(route: string){
    const data = { fetchUser: this.fetchUser };
    this.router.navigate(['/'+`${route}`], { state: data });
  }

}
