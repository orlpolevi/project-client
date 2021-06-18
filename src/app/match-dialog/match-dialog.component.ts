import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


export interface DialogData_matched {
  student_id:string;
  tutor_id:string;
  course:string;
}

@Component({
  selector: 'app-match-dialog',
  templateUrl: './match-dialog.component.html',
  styleUrls: ['./match-dialog.component.css']
})
export class MatchDialogComponent implements OnInit {
  data_from_server:any
  status_from_server:any

  constructor(
    public dialogRef: MatDialogRef<MatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData_matched,private router: Router,public dataService: DataService,
    private _snackBar: MatSnackBar) {let temp:DialogData_matched}

  ngOnInit(): void {
    //console.log(this.data)
  }
  after_sub(ob:any){
  this.status_from_server=ob["status"]
  console.log(this.status_from_server)
  if (this.status_from_server=="this match is already exist"){this.openSnackBar_ok("Cant match, user already matched to this tutor","try another tutor") }
  else {this.openSnackBar_ok("Its a match!","OK")}
  this.dialogRef.close();
  //this.router.navigate(["/dashboard"])
  }

  press_yes(){
  //send request to server to match and add to db both student and tutor as matched
  this.dataService.send_matched_choice_to_server(this.data.student_id,this.data.tutor_id,this.data.course)
  .subscribe(data=>{ 
   this.after_sub(data)})
  }

  press_no(){
    this.dialogRef.close();
        
  }
  openSnackBar_ok(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      panelClass: ['.my-snackbar'],
      //verticalPosition: 'top',
    });
  }
  openSnackBar_not_ok(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      panelClass: ['.my-snackbar-not-ok'],

    });
  }

}
