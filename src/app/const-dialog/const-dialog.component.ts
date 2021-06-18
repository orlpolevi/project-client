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
  selector: 'app-const-dialog',
  templateUrl: './const-dialog.component.html',
  styleUrls: ['./const-dialog.component.css']
})
export class ConstDialogComponent implements OnInit {

  public course_list:any=[];
  public selected_list:any=[];


  constructor(
    public dialogRef: MatDialogRef<ConstDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public dataService: DataService,
    private _snackBar: MatSnackBar) {let temp:DialogData}

     ngOnInit(): void {
 
    }

  selectedRowIds: Set<number> = new Set<number>();
  
  
  allRows: any[] = [
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



  //selectedId: string;

  onRowClick(id: number) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.allRows.filter(x => this.selectedRowIds.has(x.id));
  }

  onLogClick() {
    this.selected_list = this.getSelectedRows();
    console.log(this.selected_list)
    this.dataService.send_courses_constraits_to_server(this.data.user_id,this.selected_list).subscribe()
    setTimeout(()=>{this.openSnackBar_ok("Courses changed successfully","Ok")},500)
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
