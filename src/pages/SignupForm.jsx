import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((f) => ({ ...f, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(data);
      navigate('/profile');
    } catch (err) {
      setError('Signup failed', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        name="username"
        value={data.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        name="password"
        value={data.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        name="firstName"
        value={data.firstName}
        placeholder="First name"
        onChange={handleChange}
      />
      <input
        name="lastName"
        value={data.lastName}
        placeholder="Last name"
        onChange={handleChange}
      />
      <input
        name="email"
        value={data.email}
        placeholder="Email address"
        onChange={handleChange}
      />
      <button>Sign up</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default SignupForm;
