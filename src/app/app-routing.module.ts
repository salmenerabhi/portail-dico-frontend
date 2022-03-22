import { ToolManagementComponent } from './RD/tool-management/tool-management.component';
import { DashboardRCComponent } from './RC/dashboard-rc/dashboard-rc.component';
import { FirstpageRCComponent } from './RC/firstpage-rc/firstpage-rc.component';
import { AdministrationpageComponent } from './RD/administrationpage/administrationpage.component';
import { FaqchildComponent } from './Dashboard/faq/faqchild/faqchild/faqchild.component';
import { ListFilesComponent } from './Dashboard/list-files/list-files.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Authentification/guards/auth.guard';
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';

import { DashboardComponent } from './Dashboard/Dashboardmain/dashboard.component';

import { FirstpageComponent } from './Dashboard/Firstpage/firstpage.component';
import { HomeComponent } from './Home/home.component';
import { AddUserComponent } from './RD/UserManagement/add-user/add-user.component';
import { UpdateUserComponent } from './RD/UserManagement/update-user/update-user.component';
import { ToolsComponent } from './RD/tool-management/tools/tools.component';
import { FaqComponent } from './Dashboard/faq/faq.component';
import { ListUserComponent } from './RD/UserManagement/list-user/list-user.component';
import { AlertManagementComponent } from './RD/alert-management/alert-management.component';
import { FaqManagementComponent } from './RD/faq-management/faq-management.component';
import { FilesRequestRCComponent } from './RC/files-request-rc/files-request-rc.component';

const routes: Routes = [
  {path: '', component: HomeComponent}, 
  // { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard] },
  {path: 'firstpageRD', component:FirstpageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] ,children:[
    { path: 'listFiles', component: ListFilesComponent,canActivate: [AuthGuard]},
    { path: 'toolsmanager', component: ToolsComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'ask', component: FaqchildComponent, canActivate: [AuthGuard] },
    { path: 'administration', component: AdministrationpageComponent, canActivate: [AuthGuard] },
    {path: 'usermanagement', component:ListUserComponent, canActivate: [AuthGuard] },
    {path: 'faqmanagement', component:FaqManagementComponent, canActivate: [AuthGuard] },
    {path: 'toolmanagement', component:ToolManagementComponent, canActivate: [AuthGuard] },
    {path: 'alertmanagement', component:AlertManagementComponent, canActivate: [AuthGuard] },
  ]},
  {path: 'usermanagement', component:ListUserComponent, canActivate: [AuthGuard] },
  { path: 'updateuser', component: UpdateUserComponent, canActivate: [AuthGuard] },



  {path: 'firstpageRC', component:FirstpageRCComponent, canActivate: [AuthGuard] },
  { path: 'dashboardRC', component: DashboardRCComponent, canActivate: [AuthGuard] ,children:[
    { path: 'filesRequest', component: FilesRequestRCComponent ,canActivate: [AuthGuard]},

  ]},

  {path: 'resetPassword/:token', component: ResetPasswordComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
