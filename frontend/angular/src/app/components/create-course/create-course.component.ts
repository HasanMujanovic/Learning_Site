import { Component, OnInit } from '@angular/core';
import { CreateCourseService } from '../../services/create-course.service';
import { CourseCreate } from '../../common/course-create';
import { Course } from '../../common/course';
import { CourseSection } from '../../common/course-section';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseLection } from '../../common/course-lection';
import { User } from '../../common/user';
import { LoginService } from '../../services/login.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {
  courseSections: CourseSection[];
  courseLection: CourseLection[];
  createCourseForm: FormGroup;

  nizLekcija: CourseLection[] = [];
  nizSekcija: CourseSection[] = [];
  nizBrojeva: number[] = [];
  flag: number = 0;

  storage: Storage = sessionStorage;
  userEmail: string = JSON.parse(this.storage.getItem('user'));
  user: User = new User();
  constructor(
    private formBuilder: FormBuilder,
    private createCourseService: CreateCourseService,
    private loginService: LoginService
  ) {
    if (this.userEmail != null) {
      this.getUser();
    }
  }

  ngOnInit(): void {
    this.createCourseForm = this.formBuilder.group({
      course: this.formBuilder.group({
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        subtitle: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        skillLevel: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        category: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        language: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        duration: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        price: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        popularity: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
      section: this.formBuilder.group({
        title: new FormControl(''),
      }),
      lection: this.formBuilder.group({
        title: new FormControl(''),
        video: new FormControl(''),
      }),
    });
  }

  getUser() {
    this.loginService
      .getUserByEmail(this.userEmail)
      .pipe(catchError((err) => EMPTY))
      .subscribe({
        next: (data) => {
          this.user = data;
        },
      });
  }

  onAddLection() {
    let tempName = new CourseLection();
    tempName.title = this.createCourseForm.get('lection.title').value;
    tempName.video = this.createCourseForm.get('lection.video').value;

    this.nizLekcija.push(tempName);
    this.createCourseForm.get('lection.title').reset('');
    this.flag++;

    console.log(this.flag);
    console.log(this.nizLekcija);
  }
  onAddSection() {
    let tempSekcija = new CourseSection();
    tempSekcija.title = this.createCourseForm.get('section.title').value;
    this.nizSekcija.push(tempSekcija);
    this.nizBrojeva.push(this.flag);
    this.createCourseForm.get('section.title').reset('');
    this.createCourseForm.get('lection.title').reset('');

    console.log(this.nizLekcija);
    console.log(this.nizSekcija);
    console.log(this.nizBrojeva);

    this.flag = 0;
  }
  onSubmit() {
    let courseCreate = new CourseCreate();
    let newCourse = new Course();
    let newUser = new User();

    newUser = this.user;

    newCourse = this.createCourseForm.controls['course'].value;

    courseCreate.course = newCourse;
    courseCreate.courseSection = this.nizSekcija;
    courseCreate.courseLecture = this.nizLekcija;
    courseCreate.array = this.nizBrojeva;
    courseCreate.user = newUser;
    this.createCourseService
      .createCourse(courseCreate)
      .subscribe((data) => console.log('radi'));

    this.createCourseForm.reset();
  }
}
