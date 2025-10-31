import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../authContext';

function NavBar() {
  const { currUser, setCurrUser } = useContext(UserContext);
  function handleLogout() {
    setCurrUser(null);
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>
      {currUser ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
