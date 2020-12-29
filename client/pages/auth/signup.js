import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Opps...</h4>
          <ul className="my-0">
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
