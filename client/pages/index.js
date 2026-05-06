const Home = ({ currentUser }) => {
  return <h1>{ currentUser ? `${currentUser.email} - You are logged in` : 'You are NOT logged in' }</h1>
}

export default Home;
