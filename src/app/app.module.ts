import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule} from  '@angular/router';
//added materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';



import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { MatchStudentsComponent } from './match-students/match-students.component';
import { UserConstraintsComponent } from './user-constraints/user-constraints.component';
import { ConstDialogComponent } from './const-dialog/const-dialog.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { DayTableComponent } from './day-table/day-table.component';
import { DayConstDialogComponent } from './day-const-dialog/day-const-dialog.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatchDialogComponent } from './match-dialog/match-dialog.component';
import { TutorListDialogComponent } from './tutor-list-dialog/tutor-list-dialog.component';
import { MatchedListComponent } from './matched-list/matched-list.component';
import { UnmatchDialogComponent } from './unmatch-dialog/unmatch-dialog.component';
import { StudentDashComponent } from './student-dash/student-dash.component';


import {UserService} from './user.service';
import { FirstLoginDialogComponent } from './first-login-dialog/first-login-dialog.component';
import { TutorDashComponent } from './tutor-dash/tutor-dash.component';
import { CourseMatchDialogComponent } from './course-match-dialog/course-match-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminLoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TutorListComponent,
    MatchStudentsComponent,
    UserConstraintsComponent,
    ConstDialogComponent,
    CourseTableComponent,
    DayTableComponent,
    DayConstDialogComponent,
    StudentListComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    MatchDialogComponent,
    TutorListDialogComponent,
    MatchedListComponent,
    UnmatchDialogComponent,
    StudentDashComponent,
    FirstLoginDialogComponent,
    TutorDashComponent,
    CourseMatchDialogComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,

    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
