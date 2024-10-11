import React from 'react';
import Logo from '../../assets/img/logo/mainlogo2.png'

const Footer = () => {
    return (
        <footer>
            {/* <!-- Footer Start--> */}
            <div className="footer-area footer-padding">
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="single-footer-caption mb-50">
                                <div className="single-footer-caption mb-30">
                                    <div className="footer-tittle">
                                        <h4>EventsGo</h4>
                                        <img src={Logo} alt="" className="img-fluid" />
                                        <br />
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <a target="_blank" href="https://www.cluematrix.com/"><i
                                                    className="fa fa-globe fa-lg"></i></a>


                                                <a target="_blank"
                                                    href="https://www.linkedin.com/company/cluematrix-technologies-private-limited/mycompany/"><i
                                                        className="fab fa-linkedin-in fa-lg" ></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5" id="contact">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Contact Info</h4>
                                    <ul>
                                        <li>
                                            <p>Address :Plot No. 25, Vaishnavi Nagar, Vikasanand Mission Co.,opp Society,
                                                Kharbi, Nagpur, Maharashtra 440034</p>
                                        </li>
                                        <li><a href="#">Phone : +91 7124054190</a></li>
                                        <li><a href="#">Email : info@cluematrix.com</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>Location</h4>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14887.195617259067!2d79.144176!3d21.120582!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4b96a344ef295%3A0xf7f324a60ae28f0b!2sCluematrix%20Technologies%20Pvt.Ltd!5e0!3m2!1sen!2sin!4v1718703863581!5m2!1sen!2sin"
                                        width="600" height="450" allowfullscreen="" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"></iframe>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* <!-- footer-bottom area --> */}
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="footer-border">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-xl ">
                                <div className="footer-copy-right">
                                    <center>
                                        <p>
                                            {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --/> */}
                                            Copyright &copy;
                                            <script>document.write(new Date().getFullYear());</script> All rights reserved |
                                            <i className="fa fa-heart" aria-hidden="true"></i> by <a
                                                href="https://www.cluematrix.com/" target="_blank">Cluematrix Technologies
                                                Pvt. Ltd. </a>

                                        </p>
                                    </center>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End--> */}
        </footer>

    );
};

export default Footer;
