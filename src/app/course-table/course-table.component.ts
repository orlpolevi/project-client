import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table'
import { DataService } from '../data.service';



@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit{

  course_list:any;

  constructor(public dataService: DataService){}

  ngOnInit(): void {
    this.dataService.get_course_list().subscribe(data => {
      console.log(data);
      //this.course_list = JSON.parse(data)   
      this.course_list = data as [];
      //console.log(this.course_list)
    })
    //this.dataService.get_user_info_by_id().subscribe()
  }


  selectedRowIds: Set<number> = new Set<number>();

  allRows: any[] = [
    {id: 1, course: 'A'},
    {id: 2, course: 'B'},
    {id: 3, course: 'C'},
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
    console.log(this.getSelectedRows());
  }

}

//add get from server to recive courses

