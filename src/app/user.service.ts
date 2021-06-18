import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //user data
  Student ={
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    courseProvided:String,
    department:String,
    days:String,
    phone:String,
    ID:String,
    type:String
  }

  Current_user:any={
    id:String
  }
  
  constructor() { }

  print_id(){console.log(this.Current_user.id)}
}
