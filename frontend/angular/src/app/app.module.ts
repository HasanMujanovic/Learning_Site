import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { instructorAuthGuardGuard } from './guards/instructor-auth-guard.guard';
import { authGuardGuard } from './guards/auth-guard.guard';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [instructorAuthGuardGuard],
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuardGuard],
  },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CreateCourseComponent,
    LoginComponent,
    MainComponent,
    SearchComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
