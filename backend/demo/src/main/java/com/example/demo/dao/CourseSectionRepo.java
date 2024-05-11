package com.example.demo.dao;

import com.example.demo.entity.CourseSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "sections")
public interface CourseSectionRepo extends JpaRepository<CourseSection,Integer> {
}