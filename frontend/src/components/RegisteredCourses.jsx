import React, { useEffect, useState } from 'react';
import api from '../services/api';

function RegisteredCourses({ studentId }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!studentId) {
      setCourses([]);
      return;
    }

    api
      .get(`/registrations/${studentId}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [studentId]);

  const handleDrop = async (registrationId) => {
    try {
      await api.delete(`/drop/${registrationId}`);
      setCourses((prev) => prev.filter((c) => c.registrationId !== registrationId));
    } catch (error) {
      console.error(error);
      alert('Failed to drop course.');
    }
  };

  return (
    <div>
      {studentId && <p>Showing courses for student: {studentId}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.registrationId}>
              <td>{c.courseId}</td>
              <td>{c.courseName}</td>
              <td>{c.instructor}</td>
              <td>{c.credits}</td>
              <td>
                <button onClick={() => handleDrop(c.registrationId)}>Drop</button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan="5">No registered courses.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredCourses;

