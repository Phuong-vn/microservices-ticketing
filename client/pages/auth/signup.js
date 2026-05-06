import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '../../hooks/use-request';

export default () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchRequest, errorBlock } = useRequest({
    method: 'post',
    path: '/api/users/signup',
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push('/auth/signin');
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    fetchRequest();
  };

  return (
    <form className="py-3" onSubmit={onSubmit}>
      <h2 className="mb-3">Signup</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorBlock}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
