import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '../../hooks/use-request';

const AuthSignout = () => {
  const router = useRouter();
  const { fetchRequest } = useRequest({
    method: 'get',
    path: '/api/users/signout',
    onSuccess: () => {
      router.push('/');
    },
  });

  useEffect(() => {
    fetchRequest();
  }, []);

  return <h2>signing out ...</h2>;
};

export default AuthSignout;
