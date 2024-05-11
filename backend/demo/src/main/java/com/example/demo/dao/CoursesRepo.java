package com.example.demo.dao;

import com.example.demo.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursesRepo extends JpaRepository<Course,Integer> {
    Course findById(int id);
}

