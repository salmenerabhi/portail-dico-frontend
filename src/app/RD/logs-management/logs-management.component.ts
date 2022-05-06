import { LogsService } from './../../services/logs.service';
import { ToastrService } from 'ngx-toastr';
import { Logs } from './../../../models/log';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-logs-management',
  templateUrl: './logs-management.component.html',
  styleUrls: ['./logs-management.component.css']
})
export class LogsManagementComponent implements OnInit {
  disabled = new FormControl(false);
  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  requiredFileType:string;
  file: Logs = new Logs();
  files: File;
  constructor(private http: HttpClient,
    private toast: ToastrService,
    private logService: LogsService,
    ) { }
    message: File;

  ngOnInit(): void {
  }
  updloadFile() {
    const formData = new FormData();
  
  
      formData.append('file', this.files);
    formData.append('log', JSON.stringify(this.file));
    this.logService.Save(formData)
      .subscribe(res => {
      });
    this.toast.success('Log added successfully !!', '', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
  }
  onSelectFile(event: any) {
    const file:File = event.target.files[0];

    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
      this.message = this.files;
      this.file.filename=this.files.name
      this.fileName = file.name;
  

    }
  }
}
