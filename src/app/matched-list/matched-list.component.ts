import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { UnmatchDialogComponent} from '../unmatch-dialog/unmatch-dialog.component'
import {ExportService} from '../export.service'

@Component({
  selector: 'app-matched-list',
  templateUrl: './matched-list.component.html',
  styleUrls: ['./matched-list.component.css']
})
export class MatchedListComponent implements OnInit {

  match_list:any=[];

  constructor(public dataService: DataService,private router: Router,private dialog: MatDialog,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.display_info()
  
  }
  display_info(){
    this.dataService.get_all_matched()
    .pipe(map(data => {
      const arr= [];
      for (const key in data) {
        arr.push(data[key])
      }  
      return arr;
      }))
    .subscribe(data=>{
      //console.log(data)
      this.add_to_list(data)
    })
  }
  export() {
    //console.log(this.match_list[0]["match"]) <-way to expose inner data
    let match_list_to_excel = []
    for (var i=0;i<this.match_list.length;i++){match_list_to_excel.push(this.match_list[i]["match"])}
    this.exportService.exportExcel(match_list_to_excel, 'match list');
  }


  add_to_list(data:any){
    this.match_list=data
    console.log(this.match_list)
  }
  unmatch_student(student_id:string,tutor_id:string,course:string){
     //open dialog for confirm
     let dialogRef = this.dialog.open(UnmatchDialogComponent, {
      width: '185px',
      height: '205x',
      data: {student_id:student_id, tutor_id: tutor_id, course:course},
    });
    dialogRef.afterClosed().subscribe(res=>{
      setTimeout(()=>{this.display_info()},1000)
    })
    
    
   
  }

  return_to_dash(){
    this.router.navigate(["/dashboard"])
  }

}
