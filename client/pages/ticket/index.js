import { useEffect, useState } from 'react';
import Link from 'next/link';
import useRequest from '../../hooks/use-request';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const { fetchRequest, errorBlock } = useRequest({
    method: 'get',
    path: '/api/tickets',
  });

  const fetchData = async () => {
    try {
      const data = await fetchRequest();
      setTickets(data);
    } catch (err) {}
  };

  const onDeleteTicket = async (id) => {
    await axios.delete(`/api/tickets/${id}`);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {errorBlock}
      <div className="d-flex justify-content-end">
        <Link className="btn btn-primary" href="/ticket/create">
          Create
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length ? (
            tickets.map(({ id, title, price }, i) => (
              <tr key={id}>
                <th scope="row">{i + 1}</th>
                <td>
                  <Link href={`/ticket/${id}/details`}>{title}</Link>
                </td>
                <td>{price}</td>
                <td>
                  <ul
                    className="d-flex p-0 m-0 gap-2"
                    style={{ listStyle: 'none' }}
                  >
                    <li>
                      <Link href={`/ticket/${id}/update`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                        onClick={() => onDeleteTicket(id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TicketList;
