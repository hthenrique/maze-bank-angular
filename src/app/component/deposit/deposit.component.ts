import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchUserResponse } from 'src/app/model/response/fetch/fetch-user-response';
import { SuccessResponse } from 'src/app/model/response/success/success-response';
import { User } from 'src/app/model/user/user';
import { ServiceService } from 'src/app/service/service.service';
import {Deposit} from "../../model/deposit/deposit";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{

  balance: string;
  username: string;
  userEmail: string | null;

  fetchUser: FetchUserResponse = new FetchUserResponse();

  constructor(private activateRoute: ActivatedRoute, private router: Router, private mainService:ServiceService) {
    this.userEmail = '';
    this.username = '';
    this.balance = ''
  }

  ngOnInit(): void {
    const currentNavigation = this.router.getCurrentNavigation();
    const state = currentNavigation ? currentNavigation.extras.state : window.history.state;
    if (state && state.fetchUser) {
      this.fetchUser = state.fetchUser;
      this.username = this.fetchUser.userName;
      this.balance = this.fetchUser.userBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }
  }
  
  depositValue(value:number){
    const deposit: Deposit = new Deposit();
    deposit.value = value;
    this.mainService.depositValue(deposit, this.fetchUser.uid).subscribe(
      response => {
        console.log("Resposta: ", response);
        if (response instanceof SuccessResponse) {
          this.goToPage('main')
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
