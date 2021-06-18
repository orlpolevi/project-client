import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DialogService } from '../dialog.service'

export interface DialogData {
  user_id:string;
  name: string;
  courses:[];
}



@Component({
  selector: 'app-tutor-list-dialog',
  templateUrl: './tutor-list-dialog.component.html',
  styleUrls: ['./tutor-list-dialog.component.css']
})
export class TutorListDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TutorListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public dialogservice:DialogService,public dataService: DataService) {let temp:DialogData}
    
  ngOnInit(): void {
    
  }
  public change_course(){
    this.dialogservice.openDialog_change_courses(this.data.user_id,this.data.name)
  }
  public change_days(){
    this.dialogservice.openDialog_change_days(this.data.user_id,this.data.name)
  }
  //public change_course(id:string,name:string){
    //this.dialogservice.openDialog_change_courses(this.data.student_id,this.data.student_name)
    //this.dialogservice.openDialog_change_courses(id,name)
  //}
}
