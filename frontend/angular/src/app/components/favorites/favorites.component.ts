import { Component, OnInit } from '@angular/core';
import { SaveCourseService } from '../../services/save-course.service';
import { Course } from '../../common/course';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  courses: Course[] = [];
  storage: Storage = sessionStorage;
  email: string = JSON.parse(this.storage.getItem('user'));
  idUser: number;

  constructor(
    private saveService: SaveCourseService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.loginService.getUserByEmail(this.email).subscribe((data) => {
      this.saveService
        .getCourses(+data.id)
        .subscribe((data) => (this.courses = data));
      console.log(this.email);
    });
  }
}
