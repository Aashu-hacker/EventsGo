import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For internal routing
import Logo from '../../assets/img/logo/mainlogo.png';

const Navbar = () => {
    // State to handle mobile menu toggle
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-xl-2 col-lg-2 col-md-1">
                            <div className="logo">
                                <Link to="/">
                                    <img src={Logo} alt="Main Logo" width="80px"/>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-10 col-lg-10 col-md-10">
                            <div className="menu-main d-flex align-items-center justify-content-end">
                                {/* Main-menu for larger screens */}
                                <div className="main-menu f-right d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">
                                            <li><a href="/">Home</a></li>
                                            <li><a href="#about">About Us</a></li>
                                            <li><a href="#why">Why</a></li>
                                            <li><a href="#pricing">Pricing</a></li>
                                            <li><a href="#contact">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* Login Button */}
                                <div className="header-right-btn f-right d-none d-lg-block ml-30">
                                    <Link to="/login" className="btn header-btn">Login</Link>
                                </div>

                                {/* Mobile Menu Toggle Button */}
                                <div className="mobile-menu-icon d-block d-lg-none" onClick={toggleMobileMenu}>
                                    <span className="menu-icon">☰</span> {/* Use an icon or a hamburger menu */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu for smaller screens */}
                    <div className={`mobile-menu d-lg-none ${isMobileMenuOpen ? 'active' : ''}`}>
                        <nav>
                            <ul>
                                <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                                <li><Link to="#about" onClick={toggleMobileMenu}>About Us</Link></li>
                                {/* Uncomment if needed */}
                                {/* <li><Link to="#features" onClick={toggleMobileMenu}>Features</Link></li> */}
                                <li><Link to="#why" onClick={toggleMobileMenu}>Why</Link></li>
                                <li><Link to="#pricing" onClick={toggleMobileMenu}>Pricing</Link></li>
                                <li><Link to="#contact" onClick={toggleMobileMenu}>Contact</Link></li>
                                <li><Link to="/login" onClick={toggleMobileMenu} className="btn header-btn">Login</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
