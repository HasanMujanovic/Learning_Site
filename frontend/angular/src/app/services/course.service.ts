import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../common/course';
import { CourseSection } from '../common/course-section';
import { CourseLection } from '../common/course-lection';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://localhost:8080/utun';
  searchUrl = this.baseUrl + '/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http
      .get<getCourse>(this.searchUrl)
      .pipe(map((res) => res._embedded.courses));
  }
  getSingleCourse(id: number): Observable<Course> {
    const courseDetailsUrl = this.searchUrl + `/${id}`;

    return this.http.get<Course>(courseDetailsUrl);
  }

  getCourseSection(id: number): Observable<CourseSection[]> {
    const sectionsUrl = this.searchUrl + `/${id}/section`;
    return this.http
      .get<getSection>(sectionsUrl)
      .pipe(map((res) => res._embedded.courseSections));
  }
  getLectionFromSection(id: number): Observable<CourseLection[]> {
    const searchUrl = this.baseUrl + `/sections/${id}/lectures`;
    return this.http
      .get<getLection>(searchUrl)
      .pipe(map((res) => res._embedded.courseLectures));
  }
  getInstructor(id: number): Observable<User> {
    const searchUrl = `http://localhost:8080/utun/courses/${id}/user`;
    return this.http.get<User>(searchUrl);
  }
}
interface getCourse {
  _embedded: {
    courses: Course[];
  };
}
interface getSection {
  _embedded: {
    courseSections: CourseSection[];
  };
}
interface getLection {
  _embedded: {
    courseLectures: CourseLection[];
  };
}
