import { ListfilesATComponent } from './Actia_Toulouse/listfiles-at/listfiles-at.component';
import { HomeATComponent } from './Actia_Toulouse/home-at/home-at.component';
import { DashboardATComponent } from './Actia_Toulouse/dashboard-at/dashboard-at.component';
import { LogsComponent } from './Dashboard/logs/logs.component';
import { HomeTLComponent } from './TL/home-tl/home-tl.component';
import { ConfigurationComponent } from './RD/configuration/configuration.component';
import { ToolsRCComponent } from './RC/tools-rc/tools-rc.component';
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
import { ToolsComponent } from './RD/tool-management/tools/tools.component';
import { FaqComponent } from './Dashboard/faq/faq.component';
import { ListUserComponent } from './RD/UserManagement/list-user/list-user.component';
import { AlertManagementComponent } from './RD/alert-management/alert-management.component';
import { FaqManagementComponent } from './RD/faq-management/faq-management.component';
import { FilesRequestRCComponent } from './RC/files-request-rc/files-request-rc.component';
import { DashboardingComponent } from './RC/dashboarding/dashboarding.component';
import { RejectComponent } from './Dashboard/reject/reject.component';
import { SchedulerComponent } from './Dashboard/scheduler/scheduler.component';
import { StatsComponent } from './Dashboard/stats/stats.component';
import { DashboardTLComponent } from './TL/dashboard-tl/dashboard-tl.component';
import { ListFilesTLComponent } from './TL/list-files-tl/list-files-tl.component';
import { LogsManagementComponent } from './RD/logs-management/logs-management.component';
import { AfterAuthGuard } from './Authentification/guards/AfterAuthGuard';

const routes: Routes = [
  {path: '', component: HomeComponent ,canActivate: [AfterAuthGuard]}, 
  {path: 'firstpageRD', component:FirstpageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] ,children:[
    { path: 'listFiles', component: ListFilesComponent,canActivate: [AuthGuard]},
    { path: 'toolsmanager', component: ToolsComponent, canActivate: [AuthGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
    { path: 'administration', component: AdministrationpageComponent, canActivate: [AuthGuard] },
    {path: 'usermanagement', component:ListUserComponent, canActivate: [AuthGuard] },
    {path: 'faqmanagement', component:FaqManagementComponent, canActivate: [AuthGuard] },
    {path: 'toolmanagement', component:ToolManagementComponent, canActivate: [AuthGuard] },
    {path: 'logsmanagement', component:LogsManagementComponent, canActivate: [AuthGuard] },
    {path: 'alertmanagement', component:AlertManagementComponent, canActivate: [AuthGuard] },
    {path: 'configuration', component:ConfigurationComponent, canActivate: [AuthGuard] },
    {path: 'planning', component:SchedulerComponent, canActivate: [AuthGuard] },
  ]},



  {path: 'firstpageRC', component:FirstpageRCComponent, canActivate: [AuthGuard] },
  { path: 'dashboardRC', component: DashboardRCComponent, canActivate: [AuthGuard] ,children:[
    { path: 'filesRequest', component: FilesRequestRCComponent ,canActivate: [AuthGuard]},
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
    { path: 'toolsmanager', component: ToolsRCComponent, canActivate: [AuthGuard] },
    { path: 'mainRC', component: DashboardingComponent ,canActivate: [AuthGuard]},
    {path: 'reject', component:RejectComponent, canActivate: [AuthGuard] },
    { path: 'ask', component: FaqchildComponent, canActivate: [AuthGuard] },
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  ]},

  {path: 'homeTL', component:HomeTLComponent, canActivate: [AuthGuard] },
  {path: 'dashboardTL', component:DashboardTLComponent, canActivate: [AuthGuard] ,children:[
  { path: 'listfilesTL', component: ListFilesTLComponent,canActivate: [AuthGuard]},
  { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
  { path: 'toolsmanager', component: ToolsRCComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  ]},
  
  {path: 'homeAT', component:HomeATComponent, canActivate: [AuthGuard] },
  {path: 'dashboardAT', component:DashboardATComponent, canActivate: [AuthGuard] ,children:[
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
    { path: 'filesRequest', component: FilesRequestRCComponent ,canActivate: [AuthGuard]},
    { path: 'listfilesAT', component: ListfilesATComponent ,canActivate: [AuthGuard]},

  ]},


  {path: 'resetPassword/:token', component: ResetPasswordComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
