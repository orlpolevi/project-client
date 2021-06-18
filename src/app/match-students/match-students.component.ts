import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { Observable, pipe } from 'rxjs';
import { MatchDialogComponent} from '../match-dialog/match-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';

export interface DialogData_matched {
  student_id:string;
  tutor_id:string;
  course:string;
}
 interface courses{
  id:string;
  course:string;
}


interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-match-students',
  templateUrl: './match-students.component.html',
  styleUrls: ['./match-students.component.css']
})
export class MatchStudentsComponent implements OnInit {
  matched_tutors:any = [];
  matched_days:any;
  query_chosen_course:string="";
  query_student_id:string="";


  course_list: courses[] = [
    {id:"1", course: 'None'},
    {id:"2", course: 'Mishdif'},
    {id:"3", course: 'Calculus 1'},
    {id:"4", course: 'Calculus 2'},
    {id:"5", course: 'Probablity 1'},
    {id:"6", course: 'Probablity 2'},
    {id:"7", course: 'Physics 1'},
    {id:"8", course: 'Physics 2'},
    {id:"9", course: 'Algebra 1'},
    {id:"10", course: 'Algebra 2'},
  ];

  selected_course= this.course_list[0].course;
  query_value:string="";




  constructor( private router: Router, public dataService: DataService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  pass_name_and_course_to_server(event:any){
  const target= event.target;
  //this.query_student_id = target.querySelector('#id').value; //old query
  //this.query_chosen_course = target.querySelector('#course').value;  //old querry
  this.query_student_id=this.query_value
  this.query_chosen_course=this.selected_course
  console.log(this.selected_course)
  console.log(this.query_value)
  //this.dataService.send_name_and_course_to_GA(name, course).subscribe(data=>{
  //  console.log(data);
  //  this.matched_tutors = data;
  //})

  this.dataService.send_id_and_course_to_GA(this.query_student_id, this.query_chosen_course)
  .pipe(map(data => {
  const matched_tutor_array = [];
  for (const key in data) {
    matched_tutor_array.push({...data[key]})
  }  
  return matched_tutor_array;
  }))
  .subscribe(data=> {
    this.matched_tutors = data;
    this.matched_days = this.matched_tutors
    console.log(this.matched_tutors)
 
    

    });
  }
  
  openDialog_match_tutor_to_student(t:any) {
    //console.log(t)
    var index_of_removed_tutor = this.matched_tutors.indexOf(t)
    let dialogRef = this.dialog.open(MatchDialogComponent, {
      width: '185px',
      height: '205x',
      data: {student_id:this.query_student_id,tutor_id:t[0],course:this.query_chosen_course },
      
    });
    dialogRef.afterClosed().subscribe(data =>{this.remove_matched_from_list(index_of_removed_tutor)}
      //reroute to prev screen with empty params
     
    )}

    remove_matched_from_list(t:any){
      console.log(t)
      this.matched_tutors.splice(t,1)
    }


  return_to_dash(){
    this.router.navigate(["/dashboard"])
  }

}
