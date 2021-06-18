import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

export interface DialogData_matched {
  student_id:string;
  tutor_id:string;
  course:string;
}

@Component({
  selector: 'app-unmatch-dialog',
  templateUrl: './unmatch-dialog.component.html',
  styleUrls: ['./unmatch-dialog.component.css']
})
export class UnmatchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnmatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData_matched,private router: Router,public dataService: DataService,
    private _snackBar: MatSnackBar) {let temp:DialogData_matched}

  ngOnInit(): void {
  }
  press_yes(){
    this.dataService.send_unmatch(this.data.student_id,this.data.tutor_id,this.data.course).subscribe(data=> console.log(data))
    this.openSnackBar_ok("Student unmatched","Ok")
    this.dialogRef.close();
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

}
