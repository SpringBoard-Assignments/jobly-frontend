import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((f) => ({ ...f, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(data);
      navigate('/profile');
    } catch (err) {
      setError('Invalid login credentials');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input name="username" value={data.username} onChange={handleChange} />
      <input name="password" value={data.password} onChange={handleChange} />
      <button>Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
export default LoginForm;
