import { TypeNotif } from '../../../models/TypeNotif';
import { Notifications } from '../../../models/Notification';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { UserEntity } from 'src/models/userEntity';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.css']
})
export class AlertManagementComponent implements OnInit, AfterViewInit {
  users: UserEntity[];
  disabled?: boolean;
  
  selected: string;
  user: UserEntity = new UserEntity();
  notification:Notifications;

  delaimax = new FormControl(null, [Validators.required])
  TypeNotif = new FormControl(null, [Validators.required])
  responsible = new FormControl();

  constructor(private accountService: AccountService,
    private notifService: NotificationService,
    private token: TokenService,
    private toastr: ToastrService,
    private route: Router) {
  }
  ngAfterViewInit(): void {
    this.getAllUser();
  }

  ngOnInit(): void {
    this.notification = new Notifications();
    
  }

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  getAllUser() {
    this.accountService.getAllUsers().subscribe(data => {
      this.users = data;
    }
    )
  }

  add(): void {


    this.toastr.success(
      ``,
      'Notification added!',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',

      },
      );

  }
}
