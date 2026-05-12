import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequest from '../../hooks/use-request';

const TicketCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  const { fetchRequest, errorBlock } = useRequest({
    method: 'post',
    path: '/api/tickets',
    body: { title, price },
    onSuccess: () => {
      router.push('/ticket');
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchRequest();
  };

  return (
    <form className="py-3" onSubmit={onSubmit}>
      <h2 className="mb-3">Create</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {errorBlock}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TicketCreate;
