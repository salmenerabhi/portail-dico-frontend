import { FileDB } from '../../../../models/FileDB';
import { ToolsService } from '../../../services/tools.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserEntity } from 'src/models/userEntity';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { Tool } from 'src/models/Tool';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  retrievedImage: string = 'assets/img/toollogo.png';
  @Input()
  requiredFileType: string;
  public aa: any;

  tool: Tool;
  image: File;
  file: File;
  message: File;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient,
    private toolservice: ToolsService,
    private toast: ToastrService,
    private Token: TokenService,
private sign: AccountService,
private toolserv: ToolsService,
    private route: Router) { }

    tok: string;
    id: string;
  ngOnInit(): void {

    this.tool=new Tool();
    this.id = this.Token.getInfos().id;
    this.tok = this.Token.getToken();
    // this.toolserv.get(this.id).subscribe((res: Tool) => {
    //   this.tool = res;
    // });
  }



  updloadFile() {
    this.tool.id = this.id;
    const formData = new FormData();
    if (this.image) {
      this.tool.image = this.image.name;
    }
    formData.append('file', this.file);
    formData.append('image', this.image);
    formData.append('tool', JSON.stringify(this.tool));
    this.toolserv.Save(formData)
      .subscribe(res => {
        this.toast.success('Data added successfully !!', 'add', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error => {
        this.toast.error('Data not added !!', 'something went wrong!!', {
          timeOut: 3000,
          positionClass: 'toast-bottom-left'
        })
      });

  }

  onSelectImage(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      this.message = this.image;
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.image)

    }
    }
  

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.message = this.file;
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

}



