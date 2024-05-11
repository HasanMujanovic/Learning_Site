package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course_sections")
@Getter
@Setter
public class CourseSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    private List<CourseLecture> lectures = new ArrayList<>();

    public void add(CourseLecture courseLectures){
        if (courseLectures != null) {
            if (lectures == null) {
                lectures = new ArrayList<>();
            }
            lectures.add(courseLectures);
            courseLectures.setSection(this);
        }
    }
}
