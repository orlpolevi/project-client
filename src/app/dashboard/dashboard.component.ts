import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dataService: DataService,  private router: Router) { }

  ngOnInit(): void {
    ///this.dataService.
  }

  go_to_tutors_list(){
    this.router.navigate(["/tutors-list"])
  }
  go_to_match_students(){
    this.router.navigate(["/match-students"])
  }
  go_to_user_constraints(){
    this.router.navigate(["/user-constraints"])
  }
  go_to_students_list(){
    this.router.navigate(["/students-list"])
  }
  go_to_matched_list(){
    this.router.navigate(["/matched-list"])
  }

  go_to_manual_match(){
    //this.router.navigate(["/matched-list"])
  }

  logout(){
    this.router.navigate(["/"])
  }
}
