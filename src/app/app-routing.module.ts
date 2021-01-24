import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { StudentComponent } from './main/auth/student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashComponent } from './dashboard/student/student.component';
import { MainComponent } from './main/main.component';
import { TeacherComponent } from './main/auth/teacher/teacher.component';
import { StudentLoginComponent } from './main/auth/login/student-login/student-login.component';
import { TeacherDashComponent } from './Dashboard/teacher-dash/teacher-dash.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './main/auth/change-password/change-password.component';
import { TeacherCoursesComponent } from './dashboard/teacher-courses/teacher-courses.component';
import { CreateCourseComponent } from './dashboard/create-course/create-course.component';
import { StudentCoursesComponent } from './dashboard/student-courses/student-courses.component';
import { CourseComponent } from './dashboard/course/course.component';
import { StudentAuthGuard } from './guards/student.auth';
import { TeacherAuthGuard } from './guards/teacher.auth';

const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'student/register',component:StudentComponent},
    {path:'teacher/register',component:TeacherComponent},
    {path:'login',component:StudentLoginComponent},
    {path:'changepassword',component:ChangePasswordComponent},
  ]},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],children:[
    {path:'student',component:StudentDashComponent,canActivate:[StudentAuthGuard]},
    {path:'teacher',component:TeacherDashComponent,canActivate:[TeacherAuthGuard]},
    {path:'student/courses',component:StudentCoursesComponent,canActivate:[StudentAuthGuard]},
    {path:'student/course',component:CourseComponent,canActivate:[StudentAuthGuard]},

    {path:'teacher/courses',component:TeacherCoursesComponent,canActivate:[TeacherAuthGuard]},
    {path:'teacher/create',component:CreateCourseComponent,canActivate:[TeacherAuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
