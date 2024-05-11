package com.example.demo.dao;

import com.example.demo.entity.CourseLecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "lectures")
public interface CourseLectureRepo extends JpaRepository<CourseLecture,Integer> {
}
