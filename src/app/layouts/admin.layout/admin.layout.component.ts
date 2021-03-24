import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin.layout',
  templateUrl: './admin.layout.component.html',
  styleUrls: ['./admin.layout.component.css']
})
export class Admin implements OnInit {

  constructor() {
    document.body.style.backgroundColor = "#eee";
    document.body.style.backgroundImage = '';
   }

  ngOnInit() {
  }

}
