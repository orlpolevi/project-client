import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ConstDialogComponent } from './const-dialog/const-dialog.component';
import { DayConstDialogComponent } from './day-const-dialog/day-const-dialog.component';
import { DataService } from './data.service';
import { Router } from '@angular/router';

export interface DialogData {
  user_id:string;
  name: string;
  courses:[];
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private router: Router, public dataService: DataService,private dialog: MatDialog) { }

public   courses: any[] = [
  {id:1, course: 'Algebra 1'},
  {id:2, course: 'Algebra 2'},
  {id:3, course: 'Calculus 1'},
  {id:4, course: 'Calculus 2'},
  {id:5, course: 'Probablity 1'},
  {id:6, course: 'Probablity 2'},
  {id:7, course: 'Physics 1'},
  {id:8, course: 'Physics 2'},
  {id:9, course: 'Mishdif'},
];

public openDialog_change_courses(id_to_dialog:string,name_to_dialog:string) {
  let dialogRef = this.dialog.open(ConstDialogComponent, {
    width: '2500px',
    height: '450px',
    data: {user_id:id_to_dialog, name: name_to_dialog, courses:this.courses},
  });
  dialogRef.afterClosed().subscribe(res=>{
  
  //setTimeout(()=>{this.service_activition(this.id_to_dialog)},500) //wait for service to
  })
    
  }
  openDialog_change_days(id_to_dialog:string,name_to_dialog:string) {
    console.log(typeof(id_to_dialog))
    var new_clicked_array:boolean[] = new Array(64)
    new_clicked_array.fill(false)
    this.dataService.clicked=new_clicked_array;
    //change componentet to a new one
    let dialogRef = this.dialog.open(DayConstDialogComponent, {
      width: '1100px',
      height: '715px',
      //data: {user_id:this.id_to_dialog, name: this.name_to_dialog, courses:this.courses},
      data:{}
    });
    dialogRef.afterClosed().subscribe(res=>{
     // setTimeout(()=>{this.service_activition(this.id_to_dialog)},500) 
    })
  }

  //oprenDialog_unmatch_student(){
  //  let dialogRef = this.dialog.open()
  //}
}
