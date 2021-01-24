import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getType(el){
    let type = el.getAttribute('data-type');
    
    if(type=='student'){
      this.router.navigate(['/student/register']);
    }else if(type=='teacher'){
      this.router.navigate(['/teacher/register']);
    }
    
  }
  
  login(){
    this.router.navigate(['/login']);
  }

}
