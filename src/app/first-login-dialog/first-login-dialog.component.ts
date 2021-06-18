import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


export interface DialogData {
  user_id:string;
  name: string;
  courses:[];
}

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrls: ['./first-login-dialog.component.css']
})
export class FirstLoginDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FirstLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public dataService: DataService,
    private _snackBar: MatSnackBar) {let temp:DialogData}


  ngOnInit(): void {
  }

  close_dialog_and_send_first_login_flag_update(){
    this.dataService.first_login_update(this.data.user_id).subscribe()
    this.dialogRef.close();
  }

}
