import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Infos, Langue, RequestFile } from 'src/models/RequestFile';
import { LoadingrequestComponent } from '../loadingrequest/loadingrequest.component';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-files-request-rc',
  templateUrl: './files-request-rc.component.html',
  styleUrls: ['./files-request-rc.component.css'],

  encapsulation: ViewEncapsulation.None,

})

export class FilesRequestRCComponent implements OnInit {
 info =new Infos()
  disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  retrievedImage: string = 'assets/img/logo.png';
  @Input()
  requiredFileType:string;
selected: false;
selected1: false;
brand = new FormControl(null, [Validators.required])
target = new FormControl(null, [Validators.required])

checked = false;
  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
file= new  RequestFile()


  types:any[]=[]; // for storing types values as array..
infoForm: FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
toppings: FormGroup;

 values = [
  { info :"manual modification on demand",isCheked:false},{ info :"spell check",isCheked:false},{ info :"number per star",isCheked:true},{ info :"words in min except abbreviations",isCheked:false},{ info :"surplus of spaces",isCheked:true},{ info :"truncated words",isCheked:false},
  { info :"existing sentence",isCheked:false},{ info :"period at the end of the line",isCheked:false},{ info :"duplicates",isCheked:false},
 ];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {}
  ngOnInit(): void {
    this.file.langue=Langue.FR
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

openDialog() {
  let dialogRef =this.dialog.open(LoadingrequestComponent, {
    height: '90%',
    width: '70%',
  
  });

  dialogRef.afterClosed().subscribe(res => {
    // received data from dialog-component
    this.file=res
  })
}

getErrorMessage() {
  if (this.ECU.hasError('required')) {
    return 'You must enter an ECU';
  }

  return this.ECU.hasError('ECU') ? 'Not a valid ECU' : '';
}


}

