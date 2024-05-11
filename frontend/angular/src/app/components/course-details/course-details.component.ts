import { Component, OnInit } from '@angular/core';
import { Course } from '../../common/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseSection } from '../../common/course-section';
import { CourseLection } from '../../common/course-lection';
import { User } from '../../common/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  sections: CourseSection[];
  lections: CourseLection[];
  activeSection: number;

  user: User = new User();
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleCourse();
    });
  }

  handleCourse() {
    const courseId: number = +this.route.snapshot.paramMap.get('id');
    this.courseService
      .getSingleCourse(courseId)
      .subscribe((data) => (this.course = data));

    this.courseService
      .getCourseSection(courseId)
      .subscribe((data) => (this.sections = data));

    this.courseService.getInstructor(courseId).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  getLections(id: number) {
    if (this.activeSection == id) {
      this.activeSection = -1;
    } else {
      this.activeSection = id;
    }
    this.courseService
      .getLectionFromSection(id)
      .subscribe((data) => (this.lections = data));
  }
}
