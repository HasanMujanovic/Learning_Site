package com.example.demo.controller;

import com.example.demo.dto.CourseCreate;
import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLecture;
import com.example.demo.entity.CourseSection;
import com.example.demo.entity.User;
import com.example.demo.services.CreateCourseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = CreateCourseController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class CreateCourseControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CreateCourseService createCourseService;

    @Autowired
    private ObjectMapper objectMapper;
    private Course course;
    private List<CourseSection> courseSections;
    private List<CourseLecture> courseLectures;
    private int[] n;
    private User user;
    private  CourseCreate create;
    @BeforeEach
    public void init(){
        course = Mockito.mock(Course.class);
        courseSections = new ArrayList<>();
        courseLectures = new ArrayList<>();

        courseSections.add(CourseSection.builder().title("it").build());
        courseSections.add(CourseSection.builder().title("it").build());

        courseLectures.add(CourseLecture.builder().title("title").video("video").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());
        courseLectures.add(CourseLecture.builder().title("title").video("video").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());

        n = new int[]{1, 4};

       user = Mockito.mock(User.class);

       create = new CourseCreate(user, course, courseSections, courseLectures, n);
    }

    @Test
    public void CreateCourseController() throws Exception {
        ResultActions resultActions = mockMvc.perform(post("/utun/create-course/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(create)));

        resultActions.andExpect(MockMvcResultMatchers.status().isOk());
    }


}
