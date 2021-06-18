import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import {ExportService} from '../export.service'
import { TutorListDialogComponent} from '../tutor-list-dialog/tutor-list-dialog.component' //reusing component - no need for another one
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DayConstDialogComponent } from '../day-const-dialog/day-const-dialog.component';
import { ConstDialogComponent } from '../const-dialog/const-dialog.component';
import { CourseMatchDialogComponent} from '../course-match-dialog/course-match-dialog.component'
import { DialogService } from '../dialog.service'
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student_list:any = []

  student_list_days:any=[];

  student_with_courses ={
    "id":String,
    "courses":Array
  }
  stud = [{ "id":"","courses":[]}]
  student_for_dialog:any[]=[]


  

  constructor(public dataService: DataService, private router: Router, private exportService: ExportService,
    public dialog: MatDialog,  public dialogservice:DialogService) { }

    display_info(){
      this.dataService.recive_list_of_students_from_server()
      .pipe(map(data => {
      const student_array = [];
      for (const key in data) {
        student_array.push(...data[key])
      }  
      return student_array;
      }))
      .subscribe(data=> {console.log(data)
      this.student_list = (data)
      
      this.extract_courses(data)
      //console.log(this.student_for_dialog)
    
      })
    }

  ngOnInit(): void {
  var names_list:any=[];  
  this.display_info();
  };

  extract_courses(data:any){
    this.student_for_dialog=[]
    for (var i=0; i<data.length;i++){
      this.student_for_dialog.push({"id":data[i].id,"courses":data[i].coursesRequired})
    }
  }

  return_to_dash(){
    this.router.navigate(["/dashboard"])
  }

  export() {
   
    this.exportService.exportExcel(this.student_list, 'student list report');
  }

  open_dialog2(id_from_html:string,name_from_html:string){
    
    let dialogRef = this.dialog.open(TutorListDialogComponent,{
      height:"230px",
      width:"270px",
    data:{user_id:id_from_html,name:name_from_html}
  });
  dialogRef.afterClosed().subscribe()}

  
  open_dialog(id_from_html:string,name_from_html:string){
    
    let dialogRef = this.dialog.open(DayConstDialogComponent,{
      height:"1000px",
      width:"1500px",
    data:{user_id:id_from_html,name:name_from_html}
  });
  dialogRef.afterClosed().subscribe()}
    
  open_dialog_change_days(id:string,name:string){
    let dialogRef = this.dialog.open(DayConstDialogComponent, {
      width: '1100px',
      height: '715px',
      data: {user_id:id, name: name},
    });
    dialogRef.afterClosed().subscribe(res=>setTimeout(()=>{this.display_info()},1000))
  }
  open_dialog_change_courses(id:string,name:string){
  let dialogRef = this.dialog.open(ConstDialogComponent, {
    width: '2500px',
    height: '450px',
    data: {user_id:id, name: name, courses:this.dialogservice.courses},
  });
  dialogRef.afterClosed().subscribe(res=>setTimeout(()=>{this.display_info()},1000))
  }

  pass_name_and_course_to_server(student_for_match_dialog:any){
    //open dialog
    let dialogRef = this.dialog.open(CourseMatchDialogComponent,{
      width: '1500px',
      height: '500px',
      data: {user_id:student_for_match_dialog.id, courses:student_for_match_dialog.courses},
    });
    }
  

}
