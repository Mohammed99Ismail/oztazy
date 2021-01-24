import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CourseService{
    constructor(private http:HttpClient){}

    upload(courseId,photo,videos){

        var formData=new FormData();
        formData.append('photo',photo);
        formData.append('video',videos);

        return this.http.post(`http://mohammedismail99-001-site1.itempurl.com/data/addfiles/${courseId}`,formData);
    }

    addcourse(course){
        return this.http.post('http://mohammedismail99-001-site1.itempurl.com/data/addcourse',course);
    }

    getTeacherCourses(teacherId){
        return this.http.get(`http://mohammedismail99-001-site1.itempurl.com/data/teacher/${teacherId}`);
    }

}