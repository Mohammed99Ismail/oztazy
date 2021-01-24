import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StudentCoursesService } from 'src/app/services/student.courses';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private courseSrv:StudentCoursesService,private uploadSrv:UploadService,
    private alert:AlertifyService) { }

  course:any={};
  photoPath:string='';
  videos:any[]=[];

  ngOnInit(): void {
    this.course=this.courseSrv.courseComponent;
    //console.log(this.course);
    this.photoPath=this.course.photoPath;
    this.courseSrv.getAllVideos(this.course.id).subscribe(
      (response:any)=>{
        //console.log(response)
        this.videos=response
        //console.log(this.videos)
      },(error)=>{
        //console.log(error);
        this.alert.warning(error.error);
      }
    );

  }

  getImage(){
    return `http://mohammedismail99-001-site1.itempurl.com/Resources/images/${this.photoPath}`;
  }
  
  getVieo(path){
    return `http://mohammedismail99-001-site1.itempurl.com/Resources/videos/${path}`;
  }

}
