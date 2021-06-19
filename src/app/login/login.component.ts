import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService} from '../user.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  user_email="";
  user_password="";
  msg:any=""
  id_from_login:string=""

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router: Router, public dataService: DataService, private route: ActivatedRoute)
   { 

   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      });
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
    console.log(this.f.email.value)
    console.log(this.f.password.value)
    this.loading = true;
    var data_for_server = {email:this.f.email.value, password:this.f.password.value} 
    this.dataService.send_login_to_server_student_tutor(data_for_server)
  
    .subscribe(data=>{this.get_msg(data);console.log(data)})
  }

 // loginStudent(event:any){  //old login before validation -> can delete 
 //   const target= event.target;
    
 //   this.user_email=target.querySelector('#email').value;
 //   this.user_password=target.querySelector('#password').value;
 //   console.log('email=', this.user_email);
 //   console.log('password=', this.user_password);
 //   var data_for_server = {email:this.user_email, password:this.user_password} 
 //   this.dataService.send_login_to_server_student_tutor(data_for_server)
  
  //  .subscribe(data=>{this.get_msg(data);console.log(data)})
 //   //redirect to dash if ok
//}

get_msg(data:any){
  this.msg = data
  console.log(this.msg.type)
  console.log(this.msg.user_id)
  if (this.msg.status == "login successfull"){
  alert("login successful redirecting to dashboard")
  setTimeout(()=>{this.route_to_user_dash()},1000)
  }
  else if (this.msg.status == "email is not valid"){this.loading = false;alert("email is invalid!") }
  else {alert("Something wrong happend! cannot login!")}
  this.loading = false;
  
  
}
route_to_user_dash(){
  //case student ->student dash //student-dash
  if (this.msg.type=="student"){
    this.id_from_login = this.msg.user_id
    this.userService.Current_user.id = this.id_from_login
    // Store
    window.sessionStorage.setItem("id", this.id_from_login);
     this.router.navigate(["/student-dash"])
    }
  

  //cash tutor ->tutor dash
  if (this.msg.type=="tutor"){
    this.id_from_login = this.msg.user_id
    this.userService.Current_user.id = this.id_from_login
    // Store
    window.sessionStorage.setItem("id", this.id_from_login);
     this.router.navigate(["/tutor-dash"])
    }

}
}