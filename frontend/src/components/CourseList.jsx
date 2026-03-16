import React, { useEffect, useState } from 'react';
import api from '../services/api';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get('/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Name</th>
          <th>Instructor</th>
          <th>Credits</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c) => (
          <tr key={c.id}>
            <td>{c.courseId}</td>
            <td>{c.courseName}</td>
            <td>{c.instructor}</td>
            <td>{c.credits}</td>
          </tr>
        ))}
        {courses.length === 0 && (
          <tr>
            <td colSpan="4">No courses found. Add a course first.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CourseList;

