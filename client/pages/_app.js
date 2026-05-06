import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
};
