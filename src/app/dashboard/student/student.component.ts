import { Component,Injectable,OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EventInput } from '@fullcalendar/angular';
import { StudentCoursesService } from 'src/app/services/student.courses';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
 
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00'
  }
];

function createEventId() {
  return String(eventGuid++);
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentDashComponent implements OnInit{

  name='';
  courses:{id:number,instructor:string,type:string,title:string,teacherId:number,language:string,created:Date,
    videos:[],level:string,description:string,price:string,students:[],duration:string,photoPath:string}[]=[]
  lastViewsCoursesId:any[]=[];

  lastViewedCourses:any[]=[];
  datesOdCourses:string[]=[];
  events:{title:string,date:string}[]=[]

  constructor(private auth:AuthService,private coursesSrv:StudentCoursesService,
    private router:Router,private alert:AlertifyService) { }

  ngOnInit(): void {

    this.name=this.auth.name;

    this.coursesSrv.getAllCourse().subscribe(
      (response:any)=>{


        this.courses=response;

        var crv=JSON.parse(localStorage.getItem('enrolledItems'));
        if(crv){
          //console.log(crv)
          var enrolledCourses:any=this.courses.filter(c=>crv.includes(c.id))
          for(let i=0;i<enrolledCourses.length;i++){
            this.events.push({title:`${enrolledCourses[i].title} course`,date:new Date(enrolledCourses[i].created).toISOString().replace(/T.*$/, '')})
          }
        }
        //console.log(this.events)
        this.calendarOptions.events=this.events

        var ids=JSON.parse(localStorage.getItem('lastViews'))

        if(!!ids&&ids.length!==0){
          this.lastViewedCourses=this.courses.filter(c=>ids.includes(c.id))
        }
        //console.log(this.lastViewedCourses)

      },(error)=>{
        //console.log(error);
        this.alert.warning(error.error);
      }
    )

    if(!!!localStorage.getItem('lastViews')){
      localStorage.setItem('lastViews',JSON.stringify(this.lastViewsCoursesId));
    }

  }

  viewed(course){
    var id=course.id;
    var viewsList=JSON.parse(localStorage.getItem('lastViews'))

    if(!viewsList.includes(id)){
      viewsList.push(id);
    }

    localStorage.setItem('lastViews',JSON.stringify(viewsList));

    this.lastViewedCourses=this.courses.filter(c=>viewsList.includes(c.id))

    //console.log(this.lastViewedCourses);

    this.coursesSrv.courseComponent=course;

    this.router.navigate(['/dashboard/student/course']);
      
  }

  enroll(courseId){

    var enrolledCoursesId=[];
    var prevousCoursesId=JSON.parse(localStorage.getItem('enrolledItems'));
    enrolledCoursesId.push(courseId);
    //console.log(prevousCoursesId)
    if(!prevousCoursesId){
      localStorage.setItem('enrolledItems',JSON.stringify(enrolledCoursesId))
      prevousCoursesId=localStorage.getItem('enrolledItems')
    }
    else if(prevousCoursesId.length!==0){
      if(!prevousCoursesId.includes(courseId)){
        prevousCoursesId.push(courseId);
      }
      localStorage.setItem('enrolledItems',JSON.stringify(prevousCoursesId))
    }

    var enrolledCourses:any=this.courses.filter(c=>prevousCoursesId.includes(c.id))

    for(let i=0;i<enrolledCourses.length;i++){
      this.events.push({title:`${enrolledCourses[i].title} course`,date:new Date(enrolledCourses[i].created).toISOString().replace(/T.*$/, '')})
    }

    //console.log(this.events)
    this.calendarOptions.events=this.events


    this.coursesSrv.enrollToCourse(this.auth.id,courseId).subscribe(
      (response)=>{
        //console.log(response)
      },(error)=>{
        this.alert.error(error.error);
      }
    )
  }

  createImg(filename){
    return `http://mohammedismail99-001-site1.itempurl.com/Resources/images/${filename}`;
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: [
      { title: `event 1`, date: '2021-01-01' },
      { title: 'event 2', date: '2021-01-02' },
      ...this.events
    ]
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}

