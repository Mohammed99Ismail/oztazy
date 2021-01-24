import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isToggle=true;
  name='';
  type:string=''

  constructor(private auht:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.name=this.auht.name
    this.type=localStorage.getItem('type');
    //console.log(this.type)
  }

  toggle(){

    if(this.isToggle){
      this.isToggle=!this.isToggle
    }else{
      this.isToggle=!this.isToggle
    }
  }

  courses(){
    if(this.type=='student'){
      this.router.navigate(['/dashboard/student/courses']);
    }else if(this.type=='teacher'){
      this.router.navigate(['/dashboard/teacher/courses']);
    }else{
      //console.log('error')
    }
  }
  
  dashboard(){
    if(this.type=='student'){
      this.router.navigate(['/dashboard/student']);
    }else if(this.type=='teacher'){
      this.router.navigate(['/dashboard/teacher']);
    }else{
      //console.log('error')
    }
  }
  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('lastViews');
    localStorage.removeItem('registerToken');
    localStorage.removeItem('type');
    this.router.navigate(['/home']);
  }

}
