import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from 'src/app/Authentification/reset-password/reset-password.component';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-dashboard-at',
  templateUrl: './dashboard-at.component.html',
  styleUrls: ['./dashboard-at.component.css']
})
export class DashboardATComponent implements OnInit {
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
  constructor(private tokenService: TokenService,
              private router: Router, public LoadService: LoaderService,
              private accountService: AccountService,
              private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserById();

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
  public onError(): void {
    this.retrievedImage = this.defaultImage;
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


  redirectDashboard() {
    this.router.navigateByUrl('/dashboardAT/listfilesAT');
  }
  redirectFilesRequest() {
    this.router.navigateByUrl('/dashboardAT/filesRequest');
  }
  redirectStats() {
    this.router.navigateByUrl('/dashboardAT/stats');
  }

}

