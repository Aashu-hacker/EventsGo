import React, { useEffect } from 'react';
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/owl.carousel.min.css";
import "../../assets/css/slicknav.css";
import "../../assets/css/flaticon.css";
import "../../assets/css/gijgo.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/fontawesome-all.min.css";
import "../../assets/css/themify-icons.css";
import "../../assets/css/slick.css";
import "../../assets/css/nice-select.css";
import "../../assets/css/style.css";

// Import an animation library, e.g., AOS (Animate On Scroll) or any other React-friendly animation library
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
    // Initialize animations on component mount
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation happens only once while scrolling
        });
    }, []);

    return (
        <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10">
                        <div className="hero__caption">
                            {/* Use `data-aos` attribute for animations */}
                            <span data-aos="fade-in" data-aos-delay="100">Welcome to</span>
                            <h1 data-aos="fade-in" data-aos-delay="500">EventsGo</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
