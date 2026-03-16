package com.example.courseregistration.controller;

import com.example.courseregistration.dto.RegisterCourseRequest;
import com.example.courseregistration.dto.RegisteredCourseResponse;
import com.example.courseregistration.entity.Registration;
import com.example.courseregistration.service.RegistrationService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    // POST /register -> register a student for a course
    @PostMapping("/register")
    public Registration register(@RequestBody RegisterCourseRequest request) {
        return registrationService.registerStudentForCourse(request);
    }

    // DELETE /drop/{registrationId} -> drop a course
    @DeleteMapping("/drop/{registrationId}")
    public void dropCourse(@PathVariable Long registrationId) {
        registrationService.dropCourse(registrationId);
    }

    // GET /registrations/{studentId} -> view registered courses for a student
    @GetMapping("/registrations/{studentId}")
    public List<RegisteredCourseResponse> getRegisteredCourses(@PathVariable String studentId) {
        return registrationService.getRegisteredCourses(studentId);
    }
}

