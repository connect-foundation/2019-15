import React from 'react';
import { Link } from 'react-router-dom';
import LoginSection from '../components/LoginSection/LoginSection';

const Home = () => (
  <>
    <Link to="/main">
      <LoginSection />
    </Link>
  </>
);

export default Home;
