import { Component, OnInit,Inject } from '@angular/core';
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
  selector: 'app-day-const-dialog',
  templateUrl: './day-const-dialog.component.html',
  styleUrls: ['./day-const-dialog.component.css']
})
export class DayConstDialogComponent implements OnInit {
  

  constructor(
    public dialogRef: MatDialogRef<DayConstDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public dataService: DataService,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  
  }

  clicked(id:number) {
    return this.dataService.get_window(id);
  }

  onclick(id:number) {
   
    this.dataService.set_window(id);
  }
  clickweek(day:number) {
    var all = false;
    for (var i = 0; i < 13; i++) {
      if (this.dataService.get_window(day * 13 + i) != false) all = true;
    }
    if (all == true) {
      for (var i = 0; i < 13; i++) {
        this.dataService.set_window_bool(day * 13 + i, false);
      }
      return;
    }

    for (var i = 0; i < 13; i++) {
      this.dataService.set_window_bool(day * 13 + i, true);
    }
  }

  click_change_hours(){
    console.log(this.data.user_id)
    this.dataService.send_days_constraits_to_server(this.data.user_id).subscribe()
    this.dataService.clicked = [];
    setTimeout(()=>{this.openSnackBar_ok("Hours changed successfully","Ok")},500)
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
