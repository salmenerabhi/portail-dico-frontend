import { FileType, State } from '../../../models/RequestFile';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { RequestFile } from 'src/models/RequestFile';

@Component({
  selector: 'app-loadingrequest',
  templateUrl: './loadingrequest.component.html',
  styleUrls: ['./loadingrequest.component.css']
})
export class LoadingrequestComponent implements OnInit {
  disabled = new FormControl(false);
  selected = false;
  selected1 = false;
  file: RequestFile = new RequestFile();
  files: File;

  requestfile: RequestFile;
  @Input()
  requiredFileType: string;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;
  constructor(
    private Token: TokenService,
  ) { }
  tok: string;
  id: string;
  message: File;

  ngOnInit(): void {
    this.requestfile = new RequestFile();
    this.id = this.Token.getInfos().id;
    this.tok = this.Token.getToken();
    this.requestfile.fileType = FileType.Demande;
    this.requestfile.state = State.unstarted;
  }

  onSelectFile(event: any) {
    const file: File = event.target.files[0];

    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
      this.message = this.files;
      this.requestfile.name = this.files.name;
      this.fileName = file.name;


    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }



}
