import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherDashComponent } from './Dashboard/teacher-dash/teacher-dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashComponent } from './dashboard/student/student.component';
import { MainComponent } from './main/main.component';
import { TeacherComponent } from './main/auth/teacher/teacher.component';
import { HomeComponent } from './main/home/home.component';
import { StudentComponent } from './main/auth/student/student.component';
import { AuthService } from './services/auth.service';
import { DropService } from './services/drop.service';
import { AuthComponent } from './main/auth/auth.component';
import { StudentLoginComponent } from './main/auth/login/student-login/student-login.component';
import { AlertifyService } from './services/alertify.service';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './main/auth/change-password/change-password.component';
import { ForgetService } from './services/forget.service';
import { TeacherCoursesComponent } from './dashboard/teacher-courses/teacher-courses.component';
import { CreateCourseComponent } from './dashboard/create-course/create-course.component';
import { UploadService } from './services/upload.service';
import { CourseService } from './services/courses.service';
import {TableModule} from 'primeng/table';
import { StudentCoursesComponent } from './dashboard/student-courses/student-courses.component';
import { StudentCoursesService } from './services/student.courses';
import { CourseComponent } from './dashboard/course/course.component';
import { DatePipe } from '@angular/common';
import { TeacherAuthGuard } from './guards/teacher.auth';
import { StudentAuthGuard } from './guards/student.auth';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    TeacherDashComponent,
    DashboardComponent,
    StudentDashComponent,
    MainComponent,
    HomeComponent,
    AuthComponent,
    TeacherComponent,
    StudentComponent,
    StudentLoginComponent,
    ChangePasswordComponent,
    TeacherCoursesComponent,
    CreateCourseComponent,
    StudentCoursesComponent,
    CourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule,
    TableModule
  ],
  providers: [
    AuthService,
    DropService,
    AlertifyService,
    AuthGuard,
    StudentAuthGuard,
    TeacherAuthGuard,
    ForgetService,
    UploadService,
    CourseService,
    StudentCoursesService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
