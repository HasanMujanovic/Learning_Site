package com.example.demo.dto;

import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLecture;
import com.example.demo.entity.CourseSection;
import com.example.demo.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class CourseCreate {
    User user;
    Course course;
    List<CourseSection> courseSection;
    List<CourseLecture> courseLecture;
    int[] array;
}
