import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  ///data from server
  msg:string = "";
  status:string = "";
  //local data from ui
  user_name:string=""
  user_password:string=""


  constructor(private formBuilder: FormBuilder,public dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  reroute_login(return_value_from_server:any){
    if (return_value_from_server == true){
    this.router.navigate(["/dashboard"])
  }}
  
  
  send_login_to_server(){
  //const target= event.target;
  //this.user_name=target.querySelector('#inputName').value;
  //this.user_password =target.querySelector('#inputPassword').value;
  this.submitted = true;
    if (this.form.invalid) {
      return;
  }
  this.loading = true;
  //console.log(this.user_name)
  //console.log(this.user_password)
  var resp = this.dataService.send_login_to_server(this.f.name.value, this.f.password.value).subscribe(data=>{
  this.msg = data.body.msg;
  console.log(data)
  this.status = data.body.login
  if (this.msg == "Could not log in! name is incorrect!"|| this.msg =="Could not log in! password is incorrect!") { this.loading = false;}
  this.reroute_login(this.status)

  alert(this.msg)
  });
  }
  
  }
  
  


