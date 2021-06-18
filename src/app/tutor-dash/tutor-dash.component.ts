import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService} from '../user.service';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { ConstDialogComponent } from '../const-dialog/const-dialog.component';
import { DayConstDialogComponent } from '../day-const-dialog/day-const-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';
import {FirstLoginDialogComponent} from '../first-login-dialog/first-login-dialog.component'

@Component({
  selector: 'app-tutor-dash',
  templateUrl: './tutor-dash.component.html',
  styleUrls: ['./tutor-dash.component.css']
})
export class TutorDashComponent implements OnInit {

 

  current_id:any=""
  user_data_from_server:any = [];
  user_department ="";
  user_current_courses:any
  user_current_days:any
  user_type=""
  name_to_dialog="";
  show_user_flag = false
  user_current_tutors:any
  first_login_flag:any



  constructor(private router: Router, private userService: UserService,private route: ActivatedRoute,private dataService: DataService, private dialog: MatDialog)
  {
    var data = window.sessionStorage.getItem("id")
    this.current_id = data
  }

  ngOnInit(): void {
    this.display_info()
    //var data = window.sessionStorage.getItem("id")
    //this.current_id = data
  }

  display_info(){
    this.dataService.get_user_info_by_id(window.sessionStorage.getItem('id'))
    .pipe(map(data => {
      const matched_tutor_array = [];
      for (const key in data) {
        matched_tutor_array.push({...data[key]})
      }  
      return matched_tutor_array;
      }))
      .subscribe(data=> {
        console.log(data)
        //this.user_data_from_server = data;
        //if (this.user_data_from_server.length>1){this.show_user_flag = true;}
        //else {this.show_user_flag=false;}
        this.get_data(data)
  
        });
        console.log(this.current_id)
      this.dataService.find_single_student_match_list(this.current_id,"tutor")
      .subscribe(data=>{this.get_matches(data)})
      //open up dialog if first time
      
      //this.openDialog_first_time_login_in()
  }
  get_data(data:any){
    console.log(data)
    this.user_type=data[0].user_type
    this.name_to_dialog = data[0].name;
    //this.current_id = data[0].id;
    this.user_department= data[0].department
    this.user_current_courses = data[0].coursesProvide //most important 1
    this.user_current_days = data[0].daysProvide //most important 2
    this.first_login_flag = data[0].first_login
    if (this.first_login_flag){this.openDialog_first_time_login_in()}
  }
  get_matches(data:any){
    this.user_current_tutors = data
    if(this.user_current_tutors.status == "this student has no matches"){
      this.user_current_tutors=[]
    }
    console.log(this.user_current_tutors)
  }

  openDialog_change_courses() {

    let dialogRef = this.dialog.open(ConstDialogComponent, {
      width: '2500px',
      height: '450px',
      data: {user_id:this.current_id, name: this.name_to_dialog},
    });
    dialogRef.afterClosed().subscribe(res=>{
    
    setTimeout(()=>{this.display_info()},500) 
    })
      
    }
    openDialog_change_days() {
      var new_clicked_array:boolean[] = new Array(64)
      new_clicked_array.fill(false)
      this.dataService.clicked=new_clicked_array;
      
      let dialogRef = this.dialog.open(DayConstDialogComponent, {
        width: '1100px',
        height: '750px',
        data: {user_id:this.current_id, name: this.name_to_dialog},
      });
      dialogRef.afterClosed().subscribe(res=>{
        setTimeout(()=>{this.display_info()},500) 
      })
    }

    openDialog_first_time_login_in(){
      let dialogRef = this.dialog.open(FirstLoginDialogComponent, {
        width: '700px',
        height: '700px',
        data: {user_id:this.current_id},
      });
    }
  logout(){
    window.sessionStorage.removeItem("id");
    alert("Logout")
    this.router.navigate(["/"])
    
  }

}
