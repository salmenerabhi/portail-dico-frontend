import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  retrievedImage: string = 'assets/img/logo.png';
  constructor() { }

  ngOnInit(): void {
  }

  
}
