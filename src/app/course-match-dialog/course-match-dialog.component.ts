import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatchDialogComponent} from '../match-dialog/match-dialog.component'


export interface DialogData_for_match {
  user_id:string;
  courses:[];
}

@Component({
  selector: 'app-course-match-dialog',
  templateUrl: './course-match-dialog.component.html',
  styleUrls: ['./course-match-dialog.component.css']
})
export class CourseMatchDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CourseMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData_for_match,public dataService: DataService,private dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

    selected_course:any
    matched_tutors:any
    display_table = false;

  ngOnInit(): void {
  }

  openSnackBar_ok(message: string, action: string) {
    this._snackBar.open("Its a match!", "Ok",{
      duration:3000,
      panelClass: ['.my-snackbar'],
      //verticalPosition: 'top',
    });
  }

  close_dialog(){
    this.dialogRef.close();
  }

  match(){
    this.display_table=false;

    this.dataService.send_id_and_course_to_GA(this.data.user_id, this.selected_course)
    .pipe(map(data => {
    const matched_tutor_array = [];
    for (const key in data) {
      matched_tutor_array.push({...data[key]})
    }  
    return matched_tutor_array;
    }))
    .subscribe(data=> {
      this.matched_tutors = data;
      //this.matched_days = this.matched_tutors
      console.log(this.matched_tutors)
      if (data.length !=0){this.display_table = true}
   
      });

  }
  openDialog_match_tutor_to_student(t:any) {
    //console.log(t)
    var index_of_removed_tutor = this.matched_tutors.indexOf(t)
    let dialogRef = this.dialog.open(MatchDialogComponent, {
      width: '185px',
      height: '205x',
      data: {student_id:this.data.user_id,tutor_id:t[0],course:this.selected_course},
      
    });
    dialogRef.afterClosed().subscribe(data =>{this.remove_matched_from_list(index_of_removed_tutor)})
  }


  
  remove_matched_from_list(t:any){
    console.log(t)
    this.matched_tutors.splice(t,1)
  }
}
