import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useRequest from '../../../hooks/use-request';

const TicketCreate = () => {
  const params = useParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);


  const { fetchRequest, errorBlock } = useRequest({
    method: 'get',
    path: `/api/tickets/${params.id}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRequest();
        setTitle(data.title);
        setPrice(data.price);
      } catch (err) { }
    };
    fetchData();
  }, []);

  return (
    <form className="py-3">
      <div className='d-flex justify-content-between mb-3'>
        <h2>Details</h2>
        <Link className='d-flex align-items-center btn btn-primary' href={`/ticket/${params.id}/update`}>Update</Link>
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
          readOnly
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
          readOnly
        />
      </div>
      {errorBlock}
    </form>
  );
};

export default TicketCreate;
