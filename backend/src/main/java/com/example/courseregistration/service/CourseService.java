package com.example.courseregistration.service;

import com.example.courseregistration.entity.Course;
import com.example.courseregistration.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Course course) {
        String incomingCourseId = course.getCourseId();
        if (incomingCourseId == null || incomingCourseId.trim().isEmpty()) {
            throw new IllegalArgumentException("course id required");
        }

        String trimmedCourseId = incomingCourseId.trim();

        courseRepository.findByCourseId(trimmedCourseId)
                .ifPresent(c -> {
                    throw new IllegalArgumentException("course id same");
                });
        course.setCourseId(trimmedCourseId);

        courseRepository.findByCourseNameIgnoreCase(course.getCourseName())
                .ifPresent(c -> {
                    throw new IllegalArgumentException("course name same");
                });

        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}

