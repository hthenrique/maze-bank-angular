import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {MainComponent} from "./component/main/main.component";
import {LoginComponent} from "./component/login/login.component";
import {CreateComponent} from "./component/create/create.component";
import { DepositComponent } from './component/deposit/deposit.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'deposit',
    component: DepositComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
