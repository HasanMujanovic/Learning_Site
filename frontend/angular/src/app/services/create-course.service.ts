import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCreate } from '../common/course-create';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  private purchaseUrl = 'http://localhost:8080/utun/create-course/create';
  constructor(private htppClient: HttpClient) {}

  createCourse(courseCreate: CourseCreate): Observable<any> {
    return this.htppClient.post<CourseCreate>(this.purchaseUrl, courseCreate);
  }
}
