import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/services/account.service';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.css']
})
export class AlertManagementComponent implements OnInit ,AfterViewInit{
  users: UserEntity[];
  disabled?: boolean;
  toppings = new FormControl();
  selected: string;

  constructor(private accountService:AccountService) {
   }
  ngAfterViewInit(): void {
    this.getAllUser();  }

  ngOnInit(): void {
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  getAllUser(){
    this.accountService.getAllUsers().subscribe(data=> {
      this.users=data;
         

      }
      
    )
  }

}
