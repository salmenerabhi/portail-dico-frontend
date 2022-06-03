import { RequestService } from 'src/app/services/request.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SchedulerComponent} from './scheduler.component';
import {DayPilotModule} from 'daypilot-pro-angular';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, DayPilotModule ],
  declarations: [
    SchedulerComponent
  ],
  exports:      [ SchedulerComponent ],
  providers:    [ RequestService ]
})
export class SchedulerModule { }