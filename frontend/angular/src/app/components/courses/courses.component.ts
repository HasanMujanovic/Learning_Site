import { Component, OnInit } from '@angular/core';
import { Course } from '../../common/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => (this.courses = data));
  }
}
