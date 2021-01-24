import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()

export class ForgetService{

    constructor(private http:HttpClient){}

    code='';

    sendCode(userInfo){
        return this.http.post('http://mohammedismail99-001-site1.itempurl.com/changepassword/code',userInfo).pipe(
            map(
                (response:any)=>{
                    //console.log(response);
                    this.code=response;
                }
            )
        );
    }

    changePassword(userInfo){
        return this.http.post('http://mohammedismail99-001-site1.itempurl.com/changepassword/change',userInfo);
    }
}