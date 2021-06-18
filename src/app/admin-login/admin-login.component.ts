import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  ///data from server
  msg:string = "";
  status:string = "";
  //local data from ui
  user_name:string=""
  user_password:string=""


  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  reroute_login(return_value_from_server:any){
    if (return_value_from_server == true){
    this.router.navigate(["/dashboard"])
  }}
  
  
  send_login_to_server(event:any){
  const target= event.target;
  this.user_name=target.querySelector('#inputName').value;
  this.user_password =target.querySelector('#inputPassword').value;
  console.log(this.user_name)
  console.log(this.user_password)
  var resp = this.dataService.send_login_to_server(this.user_name, this.user_password).subscribe(data=>{
  this.msg = data.body.login;
  this.status = data.status
  console.log(data) 
  console.log(this.msg)
  this.reroute_login(this.msg)
  console.log(typeof(this.msg))
  });
  }
  
  }
  
  


