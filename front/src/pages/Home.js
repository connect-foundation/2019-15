import React from 'react';
import Topics from '../components/Topics/Topics';
import Button from '../components/globalComponents/Button/Button';
import LoginSection from '../components/LoginSection/LoginSection';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Modal from '../components/globalComponents/Modal/Modal';
import { Link } from 'react-router-dom';


const Home = () => (
  <>
    <Link to='/main'>
      <LoginSection />
    </Link>
  </>
);

export default Home;
