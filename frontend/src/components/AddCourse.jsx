import React, { useState } from 'react';
import api from '../services/api';

function AddCourse({ onCourseAdded }) {
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await api.post('/courses', {
        courseId,
        courseName,
        instructor,
        credits: Number(credits),
        description,
      });
      setMessage(`Course added successfully. Course ID: ${res.data.courseId}`);
      if (onCourseAdded) onCourseAdded(res.data);
      setCourseId('');
      setCourseName('');
      setInstructor('');
      setCredits('');
      setDescription('');
    } catch (error) {
      console.error(error);
      if (error.response && typeof error.response.data === 'string') {
        setMessage(error.response.data);
      } else {
        setMessage('Failed to add course. Please check backend.');
      }
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
        <div className="form-row">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary of the course"
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddCourse;

