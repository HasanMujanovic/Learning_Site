package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "skill_level")
    private String skillLevel;

    @Column(name = "category")
    private String category;

    @Column(name = "language")
    private String language;

    @Column(name = "duration")
    private String duration;

    @Column(name = "price")
    private double price;

    @Column(name = "popularity")
    private String popularity;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<CourseSection> section = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    })
    @JoinTable(
            name = "user_course",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users = new ArrayList<>();

    public void addUser(User user){
        if (users == null){
            users = new ArrayList<>();
        }

        users.add(user);
    }

    public void add(CourseSection item){
        if (item != null){
            if(section == null){
                section = new ArrayList<>();
            }
            section.add(item);
            item.setCourse(this);
        }
    }

}