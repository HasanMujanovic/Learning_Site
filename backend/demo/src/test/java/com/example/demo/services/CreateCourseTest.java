package com.example.demo.services;

import com.example.demo.dao.UserRepo;
import com.example.demo.dto.CourseCreate;
import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLecture;
import com.example.demo.entity.CourseSection;
import com.example.demo.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CreateCourseTest {
    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private CreateCourseServiceImpl createCourseService;

    @Test
    public void CreateCourse() {
        // Arrange
        Course course = Mockito.mock(Course.class);
        List<CourseSection> courseSections = new ArrayList<>();
        List<CourseLecture> courseLectures = new ArrayList<>();

        courseSections.add(CourseSection.builder().title("it").build());
        courseSections.add(CourseSection.builder().title("it").build());

        courseLectures.add(CourseLecture.builder().title("title").video("video").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());
        courseLectures.add(CourseLecture.builder().title("title").video("video").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());
        courseLectures.add(CourseLecture.builder().title("title1").video("video2").build());

        int[] n = {1, 4};

        User user = Mockito.mock(User.class);

        CourseCreate create = new CourseCreate(user, course, courseSections, courseLectures, n);
//
        // Act
        when(userRepo.save(user)).thenReturn(user);

        // Assert
        assertAll(() -> {
            createCourseService.creatCourse(create);
        });
    }
    }
