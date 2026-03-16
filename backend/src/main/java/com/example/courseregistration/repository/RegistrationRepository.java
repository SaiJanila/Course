package com.example.courseregistration.repository;

import com.example.courseregistration.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    List<Registration> findByStudent_StudentId(String studentId);
}

