import React, { useState } from 'react';
import api from '../services/api';

function AddCourse() {
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/courses', {
        courseId,
        courseName,
        instructor,
        credits: Number(credits),
      });
      setMessage('Course added successfully.');
      setCourseId('');
      setCourseName('');
      setInstructor('');
      setCredits('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to add course. Please check backend.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Instructor:</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Credits:</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddCourse;

