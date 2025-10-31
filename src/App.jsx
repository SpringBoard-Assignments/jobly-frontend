import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import SignUpForm from './pages/SignupForm';
import JobList from './pages/JobList';
import CompanyList from './pages/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './pages/LoginForm';
import Profile from './pages/Profile';
import JoblyApi from './api';
import UserContext from './authContext';
import './App.css';

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('jobly-token') || null
  );

  const [dataGuard, setDataGuard] = useState(false);

  //if token does not exist create it and send it to localstorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('jobly-token', token);
    } else {
      localStorage.removeItem('jobly-token');
    }
  }, [token]);

  // re-hydrate and retrieve user info on page refresh or token change

  useEffect(() => {
    async function getCurrUser() {
      setDataGuard(false);
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getUser(username);
          setCurrUser(user);
        } catch (err) {
          console.error('Auto-login procedure failed', err);
          setCurrUser(null);
        }
      } else {
        setCurrUser(null);
      }
      //force wait so that hydration finishes before render
      setDataGuard(true);
    }
    getCurrUser();
  }, [token]);
  // Authorization functions
  async function login(data) {
    try {
      const token = await JoblyApi.login(data);

      setToken(token);
      JoblyApi.token = token;

      const { username } = jwtDecode(token);
      const user = await JoblyApi.getUser(username);
      setCurrUser(user);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  }

  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data);
      setToken(token);
      JoblyApi.token = token;

      const { username } = jwtDecode(token);
      const user = await JoblyApi.getUser(username);
      setCurrUser(user);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
    JoblyApi.token = null;
  }

  //           />
  //Routes
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, dataGuard }}>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignUpForm signup={signup} />} />
          <Route path="/" element={<HomePage />} />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <CompanyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies/:handle"
            element={
              <ProtectedRoute>
                <CompanyDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
