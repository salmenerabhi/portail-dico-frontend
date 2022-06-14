import { calendarEvents } from './../../../models/calendarEvents';
import { RequestFile } from './../../../models/RequestFile';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, PopupOpenEventArgs, EJ2Instance, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { Button } from '@syncfusion/ej2-buttons';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, DragAndDropService],

  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  events: calendarEvents [] 
  selectedDate:Date
  eventSettings : EventSettingsModel
  
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {

    this.get()
  }

get(){
      this.requestService.getevents().subscribe(data => {this.events = data
      this.selectedDate = new Date(2022, 5, 3);

  this.eventSettings = {
    dataSource: this.events
    
};
})

}
onPopupOpen(args: PopupOpenEventArgs): void {
  var buttonElement = args.type === "QuickInfo" ? ".e-event-popup .e-edit" : ".e-schedule-dialog .e-event-edit";
  var editButton = document.querySelector(buttonElement);
  if (editButton && (editButton as EJ2Instance).ej2_instances) {
    ((editButton as EJ2Instance).ej2_instances[0] as Button).disabled = true;
  }
}
  
 }