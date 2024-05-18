package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_lectures")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseLecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "video")
    private String video;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private CourseSection section;
}
