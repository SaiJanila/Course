import React, { useState } from 'react';
import AddCourse from './components/AddCourse';
import CourseList from './components/CourseList';
import RegisterCourse from './components/RegisterCourse';
import RegisteredCourses from './components/RegisteredCourses';

function App() {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [role, setRole] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [mode, setMode] = useState('login'); // login | create

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!role) {
      setLoginError('Please select Student or Admin.');
      return;
    }

    if (role === 'student') {
      const name = studentName.trim();
      if (!name) {
        setLoginError('Please enter your name.');
        return;
      }

      const mail = email.trim();
      if (!mail) {
        setLoginError('Please enter your email.');
        return;
      }

      if (!password) {
        setLoginError('Please enter your password.');
        return;
      }

      const raw = localStorage.getItem('crs_students');
      const students = raw ? JSON.parse(raw) : [];
      const match = students.find(
        (s) =>
          String(s.studentName || '').toLowerCase() === name.toLowerCase() &&
          String(s.email || '').toLowerCase() === mail.toLowerCase() &&
          s.password === password
      );

      if (!match) {
        setLoginError('Invalid name, email, or password.');
        return;
      }

      setSelectedStudentId(match.studentId);
      setIsLoggedIn(true);
    } else if (role === 'admin') {
      // Simple demo credentials – replace with real auth if needed
      if (loginId === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid admin username or password.');
      }
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setLoginError('');

    const name = studentName.trim();
    const mail = email.trim();

    if (!name) {
      setLoginError('Student name is required.');
      return;
    }
    if (!mail) {
      setLoginError('Email is required.');
      return;
    }
    if (!password) {
      setLoginError('Password is required.');
      return;
    }
    if (!confirmPassword) {
      setLoginError('Please confirm your password.');
      return;
    }
    if (password !== confirmPassword) {
      setLoginError('Passwords do not match.');
      return;
    }

    const raw = localStorage.getItem('crs_students');
    const students = raw ? JSON.parse(raw) : [];

    const emailExists = students.some((s) => String(s.email || '').toLowerCase() === mail.toLowerCase());
    if (emailExists) {
      setLoginError('Email already exists. Please login using your Student ID.');
      return;
    }

    const nextNumber = String(students.length + 1).padStart(3, '0');
    const newId = `S${nextNumber}`;

    students.push({ studentId: newId, studentName: name, email: mail, password });
    localStorage.setItem('crs_students', JSON.stringify(students));

    setMode('login');
    setStudentName(name);
    setEmail(mail);
    setLoginError(`Account created. Please login.`);
    setLoginId('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    setLoginId('');
    setPassword('');
    setStudentName('');
    setEmail('');
    setConfirmPassword('');
    setLoginError('');
    setSelectedStudentId('');
    setMode('login');
  };

  const loggedInStudent =
    role === 'student' && isLoggedIn
      ? {
          studentId: selectedStudentId,
          studentName,
          email,
        }
      : null;

  return (
    <div className="container">
      <div className="header-row">
        <h1>Course Registration System</h1>
        {isLoggedIn && (
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <div className="login-wrapper">
          <div className="role-toggle">
            <button
              type="button"
              className={`role-button ${role === 'student' ? 'active' : ''}`}
              onClick={() => {
                setRole('student');
                setLoginError('');
                setMode('login');
                setLoginId('');
                setPassword('');
                setStudentName('');
                setEmail('');
                setConfirmPassword('');
              }}
            >
              Student Login
            </button>
            <button
              type="button"
              className={`role-button ${role === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setRole('admin');
                setLoginError('');
                setMode('login');
                setLoginId('');
                setPassword('');
                setStudentName('');
                setEmail('');
                setConfirmPassword('');
              }}
            >
              Admin Login
            </button>
          </div>

          {role && (
            <form
              className="login-form"
              onSubmit={mode === 'create' ? handleCreateAccount : handleLogin}
            >
              {role === 'admin' && (
                <>
                  <div className="login-row">
                    <label>Admin Username</label>
                    <input
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Enter admin username"
                    />
                  </div>

                  <div className="login-row">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                    />
                  </div>
                </>
              )}

              {role === 'student' && mode === 'login' && (
                <>
                  <div className="login-row">
                    <label>Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="login-row">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="login-row">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                </>
              )}

              {role === 'student' && mode === 'create' && (
                <>
                  <div className="login-row">
                    <label>Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="login-row">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="login-row">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Set password"
                    />
                  </div>

                  <div className="login-row">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                    />
                  </div>
                </>
              )}

              <button type="submit">
                {mode === 'create' ? 'Create Account' : 'Login'}
              </button>

              {role === 'student' && (
                <div className="login-actions">
                  {mode === 'login' ? (
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        setMode('create');
                        setLoginError('');
                        setLoginId('');
                        setPassword('');
                        setStudentName('');
                        setEmail('');
                        setConfirmPassword('');
                      }}
                    >
                      Create account
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        setMode('login');
                        setLoginError('');
                        setStudentName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                      }}
                    >
                      Back to login
                    </button>
                  )}
                </div>
              )}

              {loginError && <p className="message error">{loginError}</p>}
            </form>
          )}
        </div>
      )}

      {isLoggedIn && (
        <div className={`layout ${role === 'admin' || role === 'student' ? '' : ''}`}>
          {/* Left side: student / course view */}
          {role === 'student' && (
            <div className="layout-left">
              <div className="column-title">Student</div>

              <div className="section">
                <h2>Available Courses</h2>
                <CourseList />
              </div>

              <div className="section">
                <h2>Register for a Course</h2>
                <RegisterCourse
                  onStudentChange={setSelectedStudentId}
                  loggedInStudent={loggedInStudent}
                />
              </div>

              <div className="section">
                <h2>Registered Courses</h2>
                <RegisteredCourses studentId={selectedStudentId} />
              </div>
            </div>
          )}

          {/* Right side: admin part */}
          {role === 'admin' && (
            <div className="layout-right">
              <div className="column-title">Admin</div>

              <div className="section">
                <h2>Admin &mdash; Add Course</h2>
                <AddCourse />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

