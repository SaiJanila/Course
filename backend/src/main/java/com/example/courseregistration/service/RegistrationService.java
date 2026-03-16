package com.example.courseregistration.service;

import com.example.courseregistration.dto.RegisterCourseRequest;
import com.example.courseregistration.dto.RegisteredCourseResponse;
import com.example.courseregistration.entity.Course;
import com.example.courseregistration.entity.Registration;
import com.example.courseregistration.entity.Student;
import com.example.courseregistration.repository.CourseRepository;
import com.example.courseregistration.repository.RegistrationRepository;
import com.example.courseregistration.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public RegistrationService(RegistrationRepository registrationRepository,
                               StudentRepository studentRepository,
                               CourseRepository courseRepository) {
        this.registrationRepository = registrationRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public Registration registerStudentForCourse(RegisterCourseRequest request) {
        // Find or create student
        Student student = studentRepository.findByStudentId(request.getStudentId())
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setStudentId(request.getStudentId());
                    newStudent.setName(request.getStudentName());
                    newStudent.setEmail(request.getEmail());
                    return studentRepository.save(newStudent);
                });

        // Find course
        Course course = courseRepository.findByCourseId(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found with courseId: " + request.getCourseId()));

        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setCourse(course);
        registration.setRegistrationDate(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public void dropCourse(Long registrationId) {
        registrationRepository.deleteById(registrationId);
    }

    public List<RegisteredCourseResponse> getRegisteredCourses(String studentId) {
        List<Registration> registrations = registrationRepository.findByStudent_StudentId(studentId);

        return registrations.stream()
                .map(reg -> {
                    Course c = reg.getCourse();
                    RegisteredCourseResponse dto = new RegisteredCourseResponse();
                    dto.setRegistrationId(reg.getId());
                    dto.setCourseId(c.getCourseId());
                    dto.setCourseName(c.getCourseName());
                    dto.setInstructor(c.getInstructor());
                    dto.setCredits(c.getCredits());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

