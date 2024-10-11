import React from 'react';

import Navbar from '../ui-component/components/Navbar';
import Header from '../ui-component/components/Header';
import About from '../ui-component/components/About';
import Footer from '../ui-component/components/Footer';

const LandingPage = () => {
    return (
        <div>
          <Navbar />
          <Header />
          <About />
          <Footer />
        </div>
      );
};

export default LandingPage;
