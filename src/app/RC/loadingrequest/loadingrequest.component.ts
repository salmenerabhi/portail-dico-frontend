import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { RequestService } from 'src/app/services/request.service';
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
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  constructor(private http: HttpClient,    private requestFileService: RequestService,   private toast: ToastrService,
    private Token: TokenService,
private sign: AccountService,  
private dialogRef: MatDialogRef<LoadingrequestComponent> ) { }
  tok: string;
  id: string;
  message: File;

  ngOnInit(): void {
    this.requestfile=new RequestFile();
    this.id = this.Token.getInfos().id;
    this.tok = this.Token.getToken();
    this.requestFileService.get(this.id).subscribe((res: RequestFile) => {
      this.requestfile = res;
    });
  }

  onSelectFile(event: any) {
    const file:File = event.target.files[0];

    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
      this.message = this.files;
      // this.updloadFile();
      this.requestfile.name=this.files.name
      console.log(this.message);
      this.fileName = file.name;

    }
  }
  onFileSelected(event) {
    const file:File = event.target.files[0];
  
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );
      
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
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

updloadFile() {
  this.file.id = this.id;
  const formData = new FormData();
  formData.append('file', this.files);
  formData.append('requestfile', JSON.stringify(this.requestfile));
  this.requestFileService.Save(formData)
    .subscribe(res => {
      console.log(res);
    });
  this.toast.warning('tool added successfully !!', 'ADDED', {
    timeOut: 3000,
    positionClass: 'toast-bottom-left'
  });

}

}
