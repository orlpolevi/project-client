import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import {ExportService} from '../export.service'
import { TutorListDialogComponent} from '../tutor-list-dialog/tutor-list-dialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogService } from '../dialog.service'
import { DayConstDialogComponent } from '../day-const-dialog/day-const-dialog.component';
import { ConstDialogComponent } from '../const-dialog/const-dialog.component';

export interface DialogData {
  user_id:string;
  name: string;
  courses:[];
}

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {
  tutor_list:any = []
  tutor_list_names:any = [];
  tutor_list_dep = [];
  tutor_list_lasts =[];
  tutor_list_days:any=[]
  te:any = [];



  

  constructor(public dataService: DataService, private router: Router, private exportService: ExportService,
    public dialog: MatDialog, public dialogservice:DialogService
    ) { }

  
    
  display_info(){
    this.dataService.recive_list_of_tutors_from_server()
    .pipe(map(data => {
    const tutor_array = [];
    for (const key in data) {
      tutor_array.push(...data[key])
    }  
    return tutor_array;
    }))
    .subscribe(data=> {console.log(data)
    this.tutor_list = (data)
  
    })
  }

  ngOnInit(): void {
  var names_list:any=[];  

  this.display_info();

  };

  return_to_dash(){
    this.router.navigate(["/dashboard"])
  }

  export() {
   
    this.exportService.exportExcel(this.tutor_list, 'tutor list report');
  }

 

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
}
