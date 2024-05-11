import { Course } from './course';
import { CourseLection } from './course-lection';
import { CourseSection } from './course-section';
import { User } from './user';

export class CourseCreate {
  user: User;
  course: Course;
  courseSection: CourseSection[];
  courseLecture: CourseLection[];
  array: number[];
}
