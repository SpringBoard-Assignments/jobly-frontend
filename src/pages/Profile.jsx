import { useEffect, useContext, useState } from 'react';
import UserContext from '../authContext';
import JoblyApi from '../api';

function Profile() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [data, setData] = useState({
    firstName: currUser.firstName || '',
    lastName: currUser.lastName || '',
    email: currUser.email || '',
    password: '',
  });
  const [isSaved, setIsSaved] = useState(false);
  // load update form with current data
  useEffect(() => {
    if (currUser) {
      setData({
        firstName: currUser.firstName || '',
        lastName: currUser.lastName || '',
        email: currUser.email || '',
        password: '',
      });
    }
  }, [currUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((i) => ({ ...i, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateUser(currUser.username, data);
      setCurrUser(updatedUser);
      setIsSaved(true);
      setData((f) => ({ ...f, password: '' }));
    } catch (err) {
      console.error('Update incomplete:', err);
    }
  }
  return (
    <div className="Profile container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Username</label>
          <input value={currUser.username} disabled />
        </div>
        <div>
          <label> First Name</label>
          <input
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Last Name</label>
          <input
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Email</label>
          <input name="email" value={data.email} onChange={handleChange} />
        </div>
        <div>
          <label> Password confirmation required</label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button>Confirm changes</button>
          {isSaved && <p>Profile updated</p>}
        </div>
      </form>
    </div>
  );
}

export default Profile;
