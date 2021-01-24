import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  @ViewChild('loginForm') form:NgForm;

  user:{username:string,password:string}={
    username:'',
    password:''
  };

  constructor(private router:Router,private auth:AuthService,private alert:AlertifyService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user.username=this.form.value.name;
    this.user.password=this.form.value.password;
    
    this.auth.login(this.user).subscribe(
      (objToken)=>{
        //console.log(objToken);
        this.alert.seccess('Successful Login');
        
        if(objToken.type=='student'){
          this.auth.id=objToken.nameid;
          localStorage.setItem('type','student');
          this.router.navigate(['/dashboard/student']);
          //console.log(localStorage.getItem('type'))
        }else if(objToken.type=='teacher'){
          //console.log(localStorage.getItem('type'))
          this.auth.id=objToken.nameid;
          localStorage.setItem('type','teacher');
          this.router.navigate(['/dashboard/teacher']);
        }

      },(err)=>{
        console.log(err)
        this.alert.error(`Failed Login ${err.error}`);
      }
    );

  }

  return(){
    this.router.navigate(['/home']);
  }

  forgetPassword(){
    this.router.navigate(['changepassword']);
  }

}
