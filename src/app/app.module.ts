import { LanguageInterceptor } from './interceptors/language.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { InscriptionComponent } from './inscription/inscription.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './Dashboard/Dashboardmain/dashboard.component';
import { ListFilesComponent } from './Dashboard/list-files/list-files.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToolsComponent } from './RD/tool-management/tools/tools.component';
import { PasswordComponent } from './Authentification/password/password.component';
import { ResetPasswordComponent } from './Authentification/reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptorService } from './Authentification/services/jwt-interceptor.service';
import { AuthGuard } from './Authentification/guards/auth.guard';
import { AddUserComponent } from './RD/UserManagement/add-user/add-user.component';
import { ListUserComponent } from './RD/UserManagement/list-user/list-user.component';
import { UpdateUserComponent } from './RD/UserManagement/update-user/update-user.component';
import { FaqComponent } from './Dashboard/faq/faq.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FaqchildComponent } from './Dashboard/faq/faqchild/faqchild/faqchild.component';
import { AdministrationpageComponent } from './RD/administrationpage/administrationpage.component';
import { AlertManagementComponent } from './RD/alert-management/alert-management.component';
import { FaqManagementComponent } from './RD/faq-management/faq-management.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FaqConfigurationComponent } from './RD/faq-management/faq-configuration/faq-configuration.component';
import { FaqAddComponent } from './RD/faq-management/faq-add/faq-add.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { FirstpageComponent } from './Dashboard/Firstpage/firstpage.component';
import { FirstpageRCComponent } from './RC/firstpage-rc/firstpage-rc.component';
import { DashboardRCComponent } from './RC/dashboard-rc/dashboard-rc.component';
import { FilesRequestRCComponent } from './RC/files-request-rc/files-request-rc.component';
import {DayPilotModule} from "daypilot-pro-angular";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { LoadingrequestComponent } from './RC/loadingrequest/loadingrequest.component';
import { ToolManagementComponent } from './RD/tool-management/tool-management.component';
import { ToolconfigurationComponent } from './RD/tool-management/toolconfiguration/toolconfiguration.component';
import { DashboardingComponent } from './RC/dashboarding/dashboarding.component';
import { RejectComponent } from './Dashboard/reject/reject.component';
import { ScheduleModule, RecurrenceEditorModule,DayService,WeekService,MonthAgendaService,WorkWeekService,MonthService } from '@syncfusion/ej2-angular-schedule';
import { SchedulerComponent } from './Dashboard/scheduler/scheduler.component';
import { RichTextEditorModule, LinkService, ImageService, HtmlEditorService,ToolbarService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { CorrectionComponent } from './RC/correction/correction.component';
import { ToolsRCComponent } from './RC/tools-rc/tools-rc.component';
import { FaqAnswerComponent } from './RD/faq-management/faq-answer/faq-answer.component';
import { FaqAddAnswerComponent } from './RD/faq-management/faq-add-answer/faq-add-answer.component';
import { StatsComponent } from './Dashboard/stats/stats.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ConfigurationComponent } from './RD/configuration/configuration.component';
import { BrandsComponent } from './RD/configuration/brands/brands.component';
import { TargetsComponent } from './RD/configuration/targets/targets.component';
import {MatListModule} from '@angular/material/list';
import { AddbrandComponent } from './RD/configuration/brands/addbrand/addbrand.component';
import { AddtargetComponent } from './RD/configuration/targets/addtarget/addtarget.component';
import { DashboardTLComponent } from './TL/dashboard-tl/dashboard-tl.component';
import { ListFilesTLComponent } from './TL/list-files-tl/list-files-tl.component';
import { HomeTLComponent } from './TL/home-tl/home-tl.component';
import { LogsManagementComponent } from './RD/logs-management/logs-management.component';
import { LogsComponent } from './Dashboard/logs/logs.component';
import { FaqdescriptionComponent } from './RD/faq-management/faqdescription/faqdescription.component';
import { NoSanitizePipe } from './services/data.service';
import { LoadingapproximationComponent } from './RC/loadingapproximation/loadingapproximation.component';
import { DashboardATComponent } from './Actia_Toulouse/dashboard-at/dashboard-at.component';
import { HomeATComponent } from './Actia_Toulouse/home-at/home-at.component';
import { ListfilesATComponent } from './Actia_Toulouse/listfiles-at/listfiles-at.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { getenPaginatorIntl, getfrPaginatorIntl } from './services/MatPaginatorIntl';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscriptionComponent,
    DashboardComponent,
    ListFilesComponent,
    ToolsComponent,
    PasswordComponent,
    ResetPasswordComponent,
    AddUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    FaqComponent,
    FaqchildComponent,
    AdministrationpageComponent,
    AlertManagementComponent,
    FaqManagementComponent,
    FaqConfigurationComponent,
    FaqAddComponent,
    FirstpageComponent,
    FirstpageRCComponent,
    DashboardRCComponent,
    FilesRequestRCComponent,
    LoadingrequestComponent,
    ToolManagementComponent,
    ToolconfigurationComponent,
    DashboardingComponent,
    RejectComponent,
    SchedulerComponent,
    CorrectionComponent,
    ToolsRCComponent,
    FaqAnswerComponent,
    FaqAddAnswerComponent,
    StatsComponent,
    ConfigurationComponent,
    BrandsComponent,
    TargetsComponent,
    AddbrandComponent,
    AddtargetComponent,
    DashboardTLComponent,
    ListFilesTLComponent,
    HomeTLComponent,
    LogsManagementComponent,
    LogsComponent,
    FaqdescriptionComponent,
    NoSanitizePipe,
    LoadingapproximationComponent,
    DashboardATComponent,
    HomeATComponent,
    ListfilesATComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,MatGridListModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule,
    MatNativeDateModule ,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatCheckboxModule,
    AngularEditorModule ,
    MatTabsModule,
    MatListModule,
    AngularDualListBoxModule,
    DayPilotModule,
    ScheduleModule,
    RecurrenceEditorModule,
    RichTextEditorModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ],


  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptorService,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: LanguageInterceptor,
  multi: true
},
//{ provide: MatPaginatorIntl, useValue: getfrPaginatorIntl() },

HttpClient,
AuthGuard,DayService,WeekService,MonthAgendaService,WorkWeekService,MonthService ,
LinkService, ImageService, HtmlEditorService,ToolbarService,TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
