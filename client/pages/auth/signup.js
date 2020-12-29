import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
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
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
