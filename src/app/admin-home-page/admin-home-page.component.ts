import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  privilege: string;
  constructor() { }

  ngOnInit() 
  {
  }
  getPrivilege()
  {
    this.privilege = sessionStorage.getItem('privilege')
  }


}
