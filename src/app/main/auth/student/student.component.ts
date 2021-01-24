import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { DropService } from 'src/app/services/drop.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isSubmit=true;
  isMatch=false;
  
  @ViewChild('registerForm') form:NgForm
  @ViewChild('name') name;

  user:any={};
  
  dataCountry:string[]=[];
  constructor(private dropData:DropService,private alert:AlertifyService,
     private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.dataCountry=this.dropData.countries;
  }

  onSubmit(){
    this.alert.seccess('Successful Register');
    this.user.username=this.form.value.name;
    this.user.phone=this.form.value.phone;
    this.user.email=this.form.value.email;
    this.user.gender=this.form.value.checkbox;
    this.user.country=this.form.value.country;
    this.user.category='';
    this.user.password=this.form.value.password;
    this.user.type='student';
    
    this.authService.register(this.user).subscribe(
      (response)=>{
        //this.authService.studentId=response.id;
        //console.log(response);
        this.authService.id=response.id;
        //console.log(this.authService.id);
        localStorage.setItem('type','student');
        this.alert.seccess(`success register`);
        this.router.navigate(['/dashboard/student']);
      },
      (error)=>{
        this.alert.error(`Failed register ${error.error}`);
      }
    );
  }

  isPasswordMatch(event){
    if(event!==this.form.value.password){
      this.isMatch=true;
    }
    else{
      this.isMatch=false;
    }
  }

  return(){
    this.router.navigate(['/home']);
  }

  login(){
    this.router.navigate(['/login']);
  }

}
