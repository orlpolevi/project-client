import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Type{
  id:string;
  type:string;
}
interface Dep{
  id:string;
  dep:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  
  //old
  local_email:string="";
  local_password:string="";
  local_first_name:string="";
  local_last_name:string="";
  local_phone:string="";
  
  
  user_type: string[] = ['Student','Tutor'];

  user_list: Type[] = [
    {id:"1", type: "------"},
    {id:"1", type: 'Student'},
    {id:"2", type: 'Tutor'},
  ]
  selected_type = this.user_list[0].type

  department_list:Dep[] =[
    {id:"1", dep: "------"},
    {id:"2", dep:"Software"},
    {id:"3", dep:"Electricity and electronics"},
    {id:"4", dep:"Mechanics"},
    {id:"5", dep:"Bio-technology"},
    {id:"6", dep:"Information Systems"},
    {id:"7", dep:"Optics"},
    {id:"8", dep:"Mathematics"},
    {id:"9", dep:"Industry and management"}    
  ]
  selected_department = this.department_list[0].dep

  msg:any=""

  constructor(private formBuilder: FormBuilder,public user: UserService, public dataservice:DataService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phone:['',[Validators.required, Validators.pattern('^[0][5][0|2|3|4|5|9]{1}[ -.]{0,1}[0-9]{7}')]],
      id:['',[Validators.required, Validators.pattern('^[0-9]{9}')]],
      acceptTerms: [false, Validators.requiredTrue],
      department:['',Validators.required],
      userType:['',Validators.required],
      });

  }
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }


   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    var register_form = {
      id:this.f.id.value,
      name:this.f.firstName.value,
      last_name:this.f.lastName.value,
      department:this.f.department.value,
      password:this.f.password.value,
      email:this.f.email.value, 
      phone:this.f.phone.value,
      user_type:this.f.userType.value,
    } 
    console.log(register_form)
    this.dataservice.send_register(register_form).subscribe(data =>{
      this.get_msg(data)
    })
  }

  //bellow is the old register without validations
  StudentRegistration(event : any){
     
    const target= event.target

    this.user.Student.email=target.querySelector('#email').value;
    this.user.Student.password=target.querySelector('#password').value;
    this.user.Student.email=target.querySelector('#email').value;
    this.user.Student.firstName=target.querySelector('#firstName').value;
    this.user.Student.lastName=target.querySelector('#lastName').value;
    this.user.Student.phone=target.querySelector('#phone').value;
    this.user.Student.ID=target.querySelector('#ID').value;
    //dep and type are chosen on the chosen in the html
    

    //check if ok
    console.log('email=',  this.user.Student.email);
    console.log('password=', this.user.Student.password);
    console.log('firstName=', this.user.Student.firstName);
    console.log('lastName=', this.user.Student.lastName); 
    console.log('phone=', this.user.Student.phone);
    console.log('ID=', this.user.Student.ID);
    console.log(this.selected_type)
    console.log(this.selected_department)

   
    var register_form = {
      id:this.user.Student.ID,
      name:this.user.Student.firstName,
      last_name:this.user.Student.lastName,
      department:this.selected_department,
      password:this.user.Student.password,
      email:this.user.Student.email, 
      phone:this.user.Student.phone,
      user_type:this.selected_type.toLocaleLowerCase(),
    } 
    console.log(register_form)
    this.dataservice.send_register(register_form).subscribe(data =>{
      this.get_msg(data)
    })
  
    }
    
    get_msg(data:any){
      this.msg = data
      if (this.msg.msg == "user added to database"){
      alert("User added proceed to login")
      setTimeout(()=>{this.route_to_main()},1000)
      
      }
      else {alert("User is already in the data base!")}
      
      
    }
    route_to_main(){
      this.router.navigate(["/"])
    }

}
