import { Component, OnInit } from '@angular/core';
import { Course } from '../../common/course';
import { CourseService } from '../../services/course.service';
import { map, switchMap } from 'rxjs';
import { User } from '../../common/user';
import { LoginService } from '../../services/login.service';
import { SaveCourse } from '../../common/save-course';
import { SaveCourseService } from '../../services/save-course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  storage: Storage = sessionStorage;
  courses: Course[] = [];
  userEmail: string = JSON.parse(this.storage.getItem('user'));

  user: User = new User();
  course: Course = new Course();

  constructor(
    private courseService: CourseService,
    private loginService: LoginService,
    private saveCourse: SaveCourseService
  ) {
    this.loginService
      .getUserByEmail(this.userEmail)
      .subscribe((data) => (this.user = data));
  }
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => (this.courses = data));
  }

  getCourse() {}
  onAddFavorite(id: number) {
    this.courseService
      .getSingleCourse(id)
      .pipe(
        map((data) => {
          let save: SaveCourse = new SaveCourse();
          save.user = this.user;
          save.course = data;
          return save;
        }),
        switchMap((save) => this.saveCourse.saveCourse(save))
      )
      .subscribe(() => console.log('radi'));
  }
}
