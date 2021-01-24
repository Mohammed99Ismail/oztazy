import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UploadService{
    constructor(private http:HttpClient){}

    upload(courseId,photo:File,videos:File){

        let header = new HttpHeaders();
        header.append('Content-Type', 'multipart/form-data');
        header.append('Accept', 'application/json');

        var formData=new FormData();
        formData.append('vidoe',videos,videos.name);
        formData.append('photo',photo,photo.name);

        return this.http.post(`http://mohammedismail99-001-site1.itempurl.com/data/addfiles/${courseId}`,formData,
        {headers:header});
    }

    uploadVideosToCourses(courseId,videos:File){

        let header = new HttpHeaders();
        header.append('Content-Type', 'multipart/form-data');
        header.append('Accept', 'application/json');

        var formData=new FormData();
        formData.append('vidoe',videos,videos.name);

        return this.http.post(`http://mohammedismail99-001-site1.itempurl.com/data/addcourses/${courseId}`,formData,
        {headers:header,reportProgress:true,observe:'events'});
    }

}