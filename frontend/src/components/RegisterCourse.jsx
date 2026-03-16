import React, { useState } from 'react';
import api from '../services/api';

function RegisterCourse({ onStudentChange }) {
  const [studentId, setStudentId] = useState('S001');
  const [studentName, setStudentName] = useState('Test Student');
  const [email, setEmail] = useState('test@student.com');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/register', {
        studentId,
        studentName,
        email,
        courseId,
      });
      setMessage('Registered successfully.');
      onStudentChange(studentId);
    } catch (error) {
      console.error(error);
      setMessage('Failed to register. Make sure course ID exists.');
    }
  };

  const handleStudentIdChange = (value) => {
    setStudentId(value);
    onStudentChange(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => handleStudentIdChange(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Course ID to Register:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterCourse;

