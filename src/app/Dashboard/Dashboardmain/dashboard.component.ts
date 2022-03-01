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
  panelOpenState = false;
 user: UserEntity
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };

  option = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'Direct Visit'
          },
          {
            value: 234,
            name: 'Union Ad'
          },
          {
            value: 1548,
            name: 'Search Engine'
          }
        ]
      }
    ]
  };

  constructor(private tokenService: TokenService,
    private router: Router,
    public LoadService: LoaderService,
    private accountService: AccountService,
    private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getUserById();

  }



   getUserById() {
     this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data => {
        this.user = data;
         this.getImage();
       }
     )
   }

   getImage() {
     this.base64Data = this.user.image.data;
     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
   }

redirectTools(){
  this.router.navigateByUrl('dashboard/toolsmanager');
}
redirectDashboard(){
  this.router.navigateByUrl('/dashboard/listFiles');
}


redirectAdministration(){
  this.router.navigateByUrl('/dashboard/administration');
}

logout() {
  this.tokenService.remove();
  this.router.navigateByUrl("/");

}

openDialogPassword() {
  this.dialog.open(ResetPasswordComponent,{
    height: '40%',
    width: '60%'
  });
}
// openDialog() {
//   this.dialog.open(ProfileComponent,{
//     height: '50%',
//     width: '40%'
//   });
// }

 }