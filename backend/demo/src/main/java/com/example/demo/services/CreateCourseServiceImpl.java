package com.example.demo.services;

import com.example.demo.dao.UserRepo;
import com.example.demo.dto.CourseCreate;
import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLecture;
import com.example.demo.entity.CourseSection;
import com.example.demo.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreateCourseServiceImpl implements CreateCourseService{

    UserRepo userRepo;
    @Autowired
    public CreateCourseServiceImpl(UserRepo userRepo){
        this.userRepo = userRepo;
    }
    @Override
    @Transactional
    public void creatCourse(CourseCreate create) {

        Course course = create.getCourse();
        List<CourseSection> courseSections = new ArrayList<>();
        List<CourseLecture> courseLectures = new ArrayList<>();
        int[] niz = create.getArray();

        courseSections = create.getCourseSection();
        courseLectures = create.getCourseLecture();
        int flag = 0;
        for (int i =0 ; i<niz.length;i++){
            for (int j = flag; j < niz[i] + flag;j++){
                courseSections.get(i).add(courseLectures.get(j));
            }
            flag += niz[i];
        }

        User user = create.getUser();

        courseSections.forEach(course::add);
        user.add(course);
        userRepo.save(user);

    }
}
