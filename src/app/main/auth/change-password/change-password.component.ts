import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ForgetService } from 'src/app/services/forget.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isCodeSent=true;
  setPassword=true;
  
  @ViewChild('forgetpassword') form:NgForm;

  user:{email:string,password:string,confirmedCode:string,randomCode:string}={
    email:'',
    password:'',
    confirmedCode:'',
    randomCode:''
  };

  constructor(private router:Router,private forget:ForgetService,private alert:AlertifyService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if(!!this.form.value.email){
      this.user.email=this.form.value.email;
      this.forget.sendCode(this.user).subscribe(
          (response)=>{
            this.user.randomCode=this.forget.code.toString();
            this.isCodeSent=false;
          },(error)=>{
            this.alert.error(error.error);
          }
        )
    }
    if(!!this.form.value.code){
      this.user.confirmedCode=this.form.value.code;

      if(+this.user.confirmedCode==+this.user.randomCode){
        this.alert.seccess('code is correct')
        this.setPassword=false;
      }
      else{
        this.alert.error('error code entered')
        return;
      }
      
    }
    if(!!this.form.value.password){
      this.user.password=this.form.value.password;
      //console.log(this.user);
      this.forget.changePassword(this.user).subscribe(
        (response)=>{
          //console.log(response);
          this.alert.seccess('password changed correctly')
        },(error)=>{
          this.alert.error(error.error)
        }
      );
      this.router.navigate(['/login']);
    }

  }

  return(){
    this.router.navigate(['/login']);
  }

}
