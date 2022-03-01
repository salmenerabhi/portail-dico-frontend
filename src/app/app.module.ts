import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';



import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { InscriptionComponent } from './inscription/inscription.component';
import { FirstpageComponent } from './Firstpage/firstpage.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './Dashboard/Dashboardmain/dashboard.component';
import { ListFilesComponent } from './Dashboard/list-files/list-files.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToolsComponent } from './Dashboard/tools/tools.component';
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




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscriptionComponent,
    FirstpageComponent,
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
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatCheckboxModule,
    AngularEditorModule ,
  
    
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
  {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptorService,
  multi: true
},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
