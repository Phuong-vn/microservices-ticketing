import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useRequest from '../../../hooks/use-request';

const TicketCreate = () => {
  const params = useParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  const { fetchRequest: getTicket, errorBlock: errorGetTicket } = useRequest({
    method: 'get',
    path: `/api/tickets/${params.id}`,
  });

  const { fetchRequest: updateTicket, errorBlock: errorUpdateTicket } =
    useRequest({
      method: 'put',
      path: `/api/tickets/${params.id}`,
      body: { title, price },
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateTicket();
      setTitle(data.title);
      setPrice(data.price);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTicket();
        setTitle(data.title);
        setPrice(data.price);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <form className="py-3" onSubmit={onSubmit}>
      <div className="d-flex justify-content-between mb-3">
        <h2>Update</h2>
        <Link
          className="d-flex align-items-center btn btn-primary"
          href={`/ticket/${params.id}/details`}
        >
          Details
        </Link>
      </div>
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
      {errorGetTicket || errorUpdateTicket}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default TicketCreate;
