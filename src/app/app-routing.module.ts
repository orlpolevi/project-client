import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AdminLoginComponent} from './admin-login/admin-login.component';
import { TutorListComponent} from './tutor-list/tutor-list.component';
import {StudentListComponent} from './student-list/student-list.component'
import { MatchStudentsComponent} from './match-students/match-students.component' 
import { UserConstraintsComponent} from './user-constraints/user-constraints.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {MatchedListComponent} from './matched-list/matched-list.component'
import { StudentDashComponent} from './student-dash/student-dash.component'
import { TutorDashComponent} from './tutor-dash/tutor-dash.component'


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},
  {path: "home", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "admin-login", component: AdminLoginComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "tutors-list", component: TutorListComponent},
  {path: "students-list", component: StudentListComponent},
  {path: "match-students", component: MatchStudentsComponent},
  {path: "user-constraints", component: UserConstraintsComponent},
  {path: "matched-list", component: MatchedListComponent},
  {path: "student-dash",component:StudentDashComponent},
  {path: "tutor-dash", component:TutorDashComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
