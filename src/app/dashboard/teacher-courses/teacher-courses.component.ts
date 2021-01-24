import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/courses.service';
import { UploadService } from 'src/app/services/upload.service';
import { ToWords  } from 'to-words';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {

  constructor(private router:Router,private courses:CourseService,private uploadSrv:UploadService
    ,private auth:AuthService,private alert:AlertifyService) { }

  course:{photoPath:string,type:string,title:string,teacherId:number,language:string,created:string,
    videos:{courseId:string,photoPath:string,path:string}[]
    level:string,description:string,price:string,students:[]}[]=[]

  teacherId=0;
  photoUrl:string;
  name:string;
  @ViewChild('videoFile') videosF:ElementRef;
  videoFile:HTMLInputElement;

  progress:number;
  @Output() onUploadFinished:EventEmitter

  ngOnInit(): void {
    
    this.teacherId=this.auth.id;
    this.name=this.auth.name;

    this.courses.getTeacherCourses(this.teacherId).subscribe(
      (courseResponse:any)=>{
        this.course=courseResponse.courseResource;
        this.photoUrl=courseResponse.photoPath;

        /*console.log(this.course);
        console.log(this.photoUrl);
        console.log(this.course[0].photoPath);*/
      },
      (error)=>{
        /*console.log(this.teacherId)
        console.log(error);*/
        this.alert.warning(error.error);
      }
    )
  }

  createImg(photo:string,filename){
    return `http://mohammedismail99-001-site1.itempurl.com${photo}${filename}`;
  }

  newCourse(){
    this.router.navigate(['/dashboard/teacher/create']);
  }

  uploadVideos(id){
    this.videoFile=this.videosF.nativeElement;
    this.uploadSrv.uploadVideosToCourses(id,this.videoFile.files[0]).subscribe(
      (event)=>{
        if(event.type==HttpEventType.UploadProgress){
          this.progress=Math.round(100*(event.loaded/event.total))
          console.log(this.progress)
        }
        else if(event.type==HttpEventType.Response){
          console.log('success')
        }
        console.log('not')
      },(error)=>{
        console.log(error)
      }
    )
  }

}
