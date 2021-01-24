import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { DropService } from 'src/app/services/drop.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  @ViewChild('registerForm') form:NgForm;

  isMatch=false;
  
  dataCountry:string[]=[];
  dataCategory:string[]=[];

  user:any={};

  constructor(private dropData:DropService, private router:Router,private alert:AlertifyService
    ,private authService:AuthService) { }

  ngOnInit(): void {
    this.dataCountry=this.dropData.countries;
    this.dataCategory=this.dropData.categories;
  }

  onSubmit(){
    this.user.username=this.form.value.name;
    this.user.phone=this.form.value.phone;
    this.user.email=this.form.value.email;
    this.user.gender=this.form.value.checkbox;
    this.user.country=this.form.value.country;
    this.user.category=this.form.value.category;
    this.user.password=this.form.value.password;
    this.user.type='teacher';
    //console.log(this.user);
    this.authService.register(this.user).subscribe(
      (response:any)=>{
        //console.log(response);
        //this.authService.teacherId=+response.id;
        localStorage.setItem('type','teacher');
        this.authService.id=+response.id;
        this.alert.seccess('success registerig')
        this.router.navigate(['/dashboard/teacher']);
      },(error)=>{
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
