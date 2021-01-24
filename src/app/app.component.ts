import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'oztazyspa';
  helper = new JwtHelperService();

  constructor(private authService:AuthService){}
  
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    const registerToekn=JSON.parse(localStorage.getItem('registerToken'))

    if(token){
      this.authService.decodedToken=this.helper.decodeToken(token);
      //this.authService.teacherId=this.authService.decodedToken.nameid;
      this.authService.id=this.authService.decodedToken.nameid;
      this.authService.name=this.authService.decodedToken.unique_name;
      /*console.log(this.authService.id)
      console.log('login accsess')*/
    }
    else if(registerToekn.length!==0){
      //console.log(this.authService.id)
      this.authService.id=registerToekn[0];
      this.authService.name=registerToekn[1];
      this.authService.isRegistered=registerToekn[2];
      //console.log('register accsess')
    }
    else{
      //console.log('no accsess')
    }
  }

}
