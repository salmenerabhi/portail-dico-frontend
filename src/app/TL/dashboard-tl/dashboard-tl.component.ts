import { ResetPasswordComponent } from './../../Authentification/reset-password/reset-password.component';
import { UserEntity } from './../../../Models/userEntity';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard-tl',
  templateUrl: './dashboard-tl.component.html',
  styleUrls: ['./dashboard-tl.component.css']
})
export class DashboardTLComponent implements OnInit {
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

  redirectTools() {
    this.router.navigateByUrl('dashboardTL/toolsmanager');
  }
  redirectDashboard() {
    this.router.navigateByUrl('/dashboardTL/listfilesTL');
  }
  redirectFilesRequest() {
    this.router.navigateByUrl('/dashboardTL/filesRequest');
  }

  redirectLogs() {
    this.router.navigateByUrl('/dashboardTL/logs');
  }
  redirectFaq() {
    this.router.navigateByUrl('/dashboardTL/faq');
  }

  redirectStats() {
    this.router.navigateByUrl('/dashboardTL/stats');
  }

}
