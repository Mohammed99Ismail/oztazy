import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()

export class AuthService{
    
    decodedToken:any={};
    name='';
    isRegistered=false;
    helper = new JwtHelperService();
    id=0;

    constructor(private http:HttpClient){
    }

    register(user){
        //console.log(JSON.stringify(user));
        return this.http.post('http://mohammedismail99-001-site1.itempurl.com/Auth/register',JSON.stringify(user),
        {headers:new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
            map(
                (response:any)=>{
                    //console.log('register');
                    if(response){
                        var customeRegisterToken=[]
                        this.isRegistered=true;
                        this.name=response.name;
                        this.id=response.id;
                        customeRegisterToken.push(this.id,this.name,this.isRegistered);
                        localStorage.setItem('registerToken',JSON.stringify(customeRegisterToken))
                        return response;
                    }
                }
            )
        );
    }

    login(user){
        //console.log(JSON.stringify(user));
        return this.http.post('http://mohammedismail99-001-site1.itempurl.com/Auth/login',JSON.stringify(user),
        {headers:new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
            map(
                (response:any)=>{
                    if(response.token){
                        /*console.log(response.token)
                        console.log(response)*/
                        this.decodedToken=this.helper.decodeToken(response.token);
                        localStorage.setItem('token',response.token);
                        this.name=this.decodedToken.unique_name;
                        return this.decodedToken;
                    }
                }
            )
        );
    }

}