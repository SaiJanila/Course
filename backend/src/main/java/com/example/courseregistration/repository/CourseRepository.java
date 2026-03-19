package com.example.courseregistration.repository;

import com.example.courseregistration.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseId(String courseId);

    Optional<Course> findByCourseNameIgnoreCase(String courseName);
}

