import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserEntity } from 'src/models/userEntity';
import { ResetPasswordComponent} from 'src/app/Authentification/reset-password/reset-password.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private defaultImage: string = 'assets/img/logo.png';
  public imageUrl: string ;
  panelOpenState = false;
 user: UserEntity;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };
  lang: any;
  constructor(private tokenService: TokenService,
              private router: Router,
              public LoadService: LoaderService,
              private accountService: AccountService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUserById();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }


  public onError(): void {
    this.retrievedImage = this.defaultImage;
   
  }

   getUserById() {
     this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data => {
        this.user = data;
        this.getImage();
       }
     );
   }

   getImage() {
     this.base64Data = this.user.image.data;
     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
   }

redirectTools(){
  this.router.navigateByUrl('/dashboard/toolsmanager');
}

redirectLogs(){
  this.router.navigateByUrl('/dashboard/logs');
}
redirectDashboard(){
  this.router.navigateByUrl('/dashboard/listFiles');
}

redirectFaq(){
  this.router.navigateByUrl('/dashboard/faq');
}
redirectStats(){
  this.router.navigateByUrl('/dashboard/stats');
}

redirectAdministration(){
  this.router.navigateByUrl('/dashboard/administration');
}

logout() {
  this.tokenService.remove();
  this.router.navigateByUrl('/');

}

openDialogPassword() {
  this.dialog.open(ResetPasswordComponent, {
    height: '40%',
    width: '60%'
  });
}
changeLang(lang){
  localStorage.setItem('lang', lang);
  window.location.reload();
    }
 }
