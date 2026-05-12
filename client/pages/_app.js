import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import axios from 'axios';
import App from 'next/app';
import Link from 'next/link';
import buildClient from '../api/build-client';

const ClientApp = ({ Component, pageProps }) => {
  const { currentUser } = pageProps;
  const navLinks = [
    { label: 'Ticket', href: '/ticket' },
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter((navLink) => navLink)
    .map((navLink, i) => (
      <li key={i} className="list-group-item p-0">
        <Link
          href={navLink.href}
          className="d-flex align-items-center justify-content-center px-2 list-group-item-action h-100"
        >
          {navLink.label}
        </Link>
      </li>
    ));
  return (
    <>
      <header className="d-flex align-center justify-content-between p-2">
        <h1>
          <Link href="/">GitTix</Link>
        </h1>
        <ul className="list-group list-group-horizontal">{navLinks}</ul>
      </header>
      <div className="container pt-4">
        <Component {...pageProps} />
      </div>
    </>
  );
};

ClientApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);
  const pageProps = {};

  const client = buildClient(context.ctx);
  try {
    const { data } = await client.get('/api/users/currentuser', context.ctx);
    pageProps.currentUser = data.currentUser;
  } catch (error) {
    console.error(error.response.data);
    console.error(error.response.status);
  }

  return { ctx, pageProps };
};

export default ClientApp;
