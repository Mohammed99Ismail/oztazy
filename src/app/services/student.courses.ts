import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class StudentCoursesService{

    courseComponent:any={};

    constructor(private http:HttpClient){}

    enrollToCourse(studentId,courseId){
        return this.http.post(`http://mohammedismail99-001-site1.itempurl.com/data/student/${studentId}/${courseId}`,null);
    }

    getStudentCourses(studentId){
        return this.http.get(`http://mohammedismail99-001-site1.itempurl.com/data/student/${studentId}`);
    }
    
    getAllCourse(){
        return this.http.get('http://mohammedismail99-001-site1.itempurl.com/data/courses');
    }

    getAllVideos(courseId){
        return this.http.get(`http://mohammedismail99-001-site1.itempurl.com/data/videos/${courseId}`);
    }
}