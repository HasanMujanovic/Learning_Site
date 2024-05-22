import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveCourse } from '../common/save-course';
import { Observable, map } from 'rxjs';
import { Course } from '../common/course';

@Injectable({
  providedIn: 'root',
})
export class SaveCourseService {
  private saveUrl = 'http://localhost:8080/utun/save-course/save';
  courses: Course[];
  constructor(private htppClient: HttpClient) {}

  saveCourse(saveCourse: SaveCourse): Observable<any> {
    return this.htppClient.post<SaveCourse>(this.saveUrl, saveCourse);
  }
  getCourses(id: number): Observable<Course[]> {
    const getCourses = `http://localhost:8080/utun/users/${id}/favoriteCourses`;
    return this.htppClient
      .get<getCourse>(getCourses)
      .pipe(map((res) => res._embedded.courses));
  }
}
interface getCourse {
  _embedded: {
    courses: Course[];
  };
}
