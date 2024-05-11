package com.example.demo.controller;

import com.example.demo.dto.CourseCreate;
import com.example.demo.services.CreateCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/utun/create-course")
public class CreateCourseController {
    private CreateCourseService createCourseService;

    @Autowired
    public CreateCourseController(CreateCourseService createCourseService){
        this.createCourseService = createCourseService;
    }

    @PostMapping("/create")
    public void placeOrder(@RequestBody CourseCreate create){
        createCourseService.creatCourse(create);
    }
}
