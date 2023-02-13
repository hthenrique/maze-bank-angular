import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  balance: string = '$312.311.00';
  username: string = 'henrique_ht';

  ngOnInit(){
  }

}
