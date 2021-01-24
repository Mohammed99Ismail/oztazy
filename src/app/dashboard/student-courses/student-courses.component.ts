import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentCoursesService } from 'src/app/services/student.courses';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  //products:{name:string,category:string,description:string,instructor:string}[]=[]

  courses:{studentId:number,teacherId:number,course:any}[]=[]
  cols: any[];
  num:any[]=[1]

  constructor(private courseSrv:StudentCoursesService,
    private authService:AuthService,private alert:AlertifyService) { }

  ngOnInit(): void {

    this.courseSrv.getStudentCourses(this.authService.id).subscribe(
      (response:any)=>{
        this.courses=response;
        /*console.log(this.courses)
        console.log(this.courses.length)*/
      },(error)=>{
        //console.log(error);
        this.alert.warning(error.error);
      }
    )

    this.cols = [
      { field: 'name', header: 'Course Name' },
      { field: 'category', header: 'Category' },
      { field: 'instructor', header: 'Instructor' },
      { field: 'description', header: 'Description' }
  ];

  }

}
