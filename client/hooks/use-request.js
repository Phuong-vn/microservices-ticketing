import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default ({ method, path, body, onSuccess }) => {
  const router = useRouter();
  const [errorBlock, setErrorBlock] = useState(null);

  const fetchRequest = async () => {
    try {
      const response = await axios[method](path, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err) {
      setErrorBlock(
        <div className="text-bg-danger p-3 mb-3">
          <h2>OPPPPS.........</h2>
          <ul>
            {err.response.data.errors.map((error, i) => (
              <li key={i}>{error.message}</li>
            ))}
          </ul>
        </div>,
      );
    }
  };

  return { fetchRequest, errorBlock };
};
