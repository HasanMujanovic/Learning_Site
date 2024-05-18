package com.example.demo.dto;

import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLecture;
import com.example.demo.entity.CourseSection;
import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseCreate {
    User user;
    Course course;
    List<CourseSection> courseSection;
    List<CourseLecture> courseLecture;
    int[] array;
}
