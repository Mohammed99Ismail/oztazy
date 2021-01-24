import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/courses.service';
import { DropService } from 'src/app/services/drop.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  uploadVideos=false;

  dataTypes:string[]=[];
  dataLanguages:string[]=[];
  dataLevels:string[]=[];

  @ViewChild('photoFile') photoF:ElementRef;
  @ViewChild('videoFile') videosF:ElementRef;
  @ViewChild('courseForm') form:NgForm;

  photoFile:HTMLInputElement;
  videoFile:HTMLInputElement;

  course:{instructor:string,type:string,title:string,teacherId:number,language:string,created:Date,videos:[]
    level:string,description:string,price:string,students:[],duration:string,photoPath:string}={
    title:'',
    teacherId:0,
    description:'',
    language:'',
    level:'',
    price:'',
    type:'',
    duration:'',
    instructor:'',
    students:[],
    created:new Date(Date.now()),
    photoPath:'',
    videos:[]
  }

  constructor(private uploadSrv:UploadService,private courseSrv:CourseService,private auth:AuthService
    ,private dropSrv:DropService,private alert:AlertifyService,private router:Router) { }

  ngOnInit(): void {
    this.dataLanguages=this.dropSrv.languages;
    this.dataTypes=this.dropSrv.categories;
    this.dataLevels=this.dropSrv.level;
  }

  next(){
    
    if(this.photoF.nativeElement.files.length==0){
      this.alert.error('you should upload photo for the course');
      return;
    }

    this.course.description=this.form.value.description;
    this.course.level=this.form.value.level;
    this.course.language=this.form.value.language;
    this.course.type=this.form.value.type;
    this.course.title=this.form.value.title;
    this.course.duration=this.form.value.duration;
    this.course.price=this.form.value.price;
    this.course.teacherId=this.auth.id;
    this.course.instructor=this.auth.name;
    //console.log(this.course.teacherId);

    this.uploadVideos=true;
  }
  
  back(){
    this.uploadVideos=false;
  }

  done(){
    if(this.videosF.nativeElement.files.length==0){
      this.alert.error('you should upload videos for the course');
      return;
    }

    /*console.log(JSON.stringify(this.course));
    console.log(this.photoFile);
    console.log(this.videoFile);*/
    this.courseSrv.addcourse(this.course).subscribe(

      (response:any)=>{

        this.uploadSrv.upload(response.id,this.photoFile.files[0],this.videoFile.files[0]).subscribe(
         (response)=>{
           //console.log(response);
           this.router.navigate(['/dashboard/teacher/courses'])
         },(error)=>{
          //console.log(error);
          this.alert.error(error.error);
        }
        )

      },(error)=>{
        //console.log(error);
        this.alert.error(error.error);
      }

    )

  }
  
  photo(){
    this.photoFile=this.photoF.nativeElement;
  }

  video(){
    this.videoFile=this.videosF.nativeElement;
  }

}
