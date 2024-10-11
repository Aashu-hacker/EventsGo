import React from "react";

import "../../App.css";

import AboutImg2 from "../../assets/img/gallery/about2.png";

import AboutImg1 from "../../assets/img/gallery/about1.png";
import MainLogo from "../../assets/img/logo/mainlogo.png";
import photographer from "../../assets/img/gallery/photographer.jpg";
import mehandi from "../../assets/img/gallery/mehandi.webp";
import hall from "../../assets/img/gallery/hall.jpg";

const About = () => {
  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="about-caption mb-50">
              {/* <!-- Section Tittle --> */}
              <div className="section-tittle mb-35">
                <h2>About Us</h2>
                <h3>
                  Welcome to EventsGo, Your Ultimate Event Management Partner
                </h3>
              </div>
              <p>
                where we revolutionize the way event Partners plan, manage, and
                execute their events. Overall, EventsGo offers Partners in the
                event industry a suite of tools and features that streamline
                operations, enhance customer experiences, and strengthen
                business relationships, ultimately driving growth and success in
                a competitive market landscape.
              </p>

              <p>
                Transform the way you manage events with EventsGo, the ultimate
                event management platform for Partners. Streamline your
                operations, enhance communication, and deliver exceptional
                experiences to your clients.
              </p>

              <p>
                We understand the challenges of juggling countless details and
                tasks, which is why we designed EventsGo to be your ultimate
                event management partner. From vendor registration and admin
                verification to event creation and management, our platform has
                everything you need in one place.
              </p>
            </div>
            <div className="row">
              <div className="">
                <div className="single-caption">
                  <div className="caption">
                    <h5>
                      Say goodbye to event planning stress and hello to seamless
                      management with EventsGo. Start your journey towards
                      flawless event management today!
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" className="btn mt-50">
              Lets Start
            </a>
          </div>
          <div className="col-lg-6 col-md-12">
            {/* <!-- about-img --> */}
            <div className="about-img ">
              <div className="about-font-img d-none d-lg-block">
                <img src={AboutImg1} alt="" />
              </div>
              <div className="about-back-img ">
                <img src={AboutImg2} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="about-section" id="about">
          <div className="container">
            <div className="row align-items-center flex-row-reverse justify-content-between">
              <div className="col-lg-5">
                <div className="">
                  <div className="">
                    <h2 className="h1">Our Vision</h2>
                    <p>
                      "To redefine the event management landscape through
                      cutting-edge technology, empowering partners with
                      effortless planning, seamless coordination, and
                      unforgettable experiences."
                    </p>
                  </div>
                  <div className="">
                    <h2 className="h1">Our Mission</h2>
                    <p>
                      "At EventsGo, we're dedicated to providing event partners
                      with an integrated plaIorm that streamlines operaJons,
                      enhances communicaJon, and drives unmatched efficiency. By
                      simplifying the complexiJes of event management, we strive
                      to elevate every event to new heights of success and
                      saJsfacJon."
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                {/* <!--* End Heading --> */}
                <div className="text-wrapper">
                  <img src={MainLogo} />
                </div>
                {/* <!-- <div className="btn-wrapper">
                <a className="btn btn-primary" href="https://admin.plotwell.in">Discover More</a>
            </div> --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="accordion fix">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              {/* <!-- Section Title --> */}
              <div class="section-title">
                <h4>
                  Experience the power of EventsGo and revolutionize your
                  approach to event management today!
                </h4>
              </div>
            </div>
          </div>
          <br />

          {/* <!-- Image Section for Photographers --> */}
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
              <img src={photographer} alt="Photographers" class="img-fluid" />
            </div>
            <div class="col-lg-8">
              <div class="info-section">
                <b>
                  <h5>For Photographers:</h5>
                </b>
                <ul>
                  <li>
                    Schedule Shoots: Easily plan and organize photo sessions
                    with clients using the integrated calendar functionality.
                  </li>
                  <li>
                    Manage Bookings: Keep track of all bookings and appointments
                    in one place, ensuring a smooth workflow.
                  </li>
                  <li>
                    Showcase Portfolios: Display your portfolio of work within
                    EventsGo, allowing clients to view your past projects and
                    style.
                  </li>
                  <li>
                    Handle Client Interactions: Communicate seamlessly with
                    clients, send updates, and address queries directly through
                    the platform.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- Information Section for Mehndi Artists --> */}
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-8 order-lg-2">
              <div class="info-section">
                <h5>For Mehndi Artists:</h5>
                <ul>
                  <li>
                    Book Appointments: Schedule appointments with clients,
                    manage availability, and avoid double bookings.
                  </li>
                  <li>
                    Manage Client Lists: Maintain a database of clients, track
                    appointments, and keep records of preferences and designs.
                  </li>
                  <li>
                    Display Past Work: Showcase your previous mehndi designs and
                    artwork to potential clients, highlighting your expertise
                    and creativity.
                  </li>
                  <li>
                    Track Payments: Monitor payment statuses, send invoices, and
                    track payments received, ensuring timely and accurate
                    transactions.
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg">
              <img src={mehandi} alt="Photographers" class="img-fluid" />
            </div>
          </div>

          {/* <!-- Information Section for Halls and Lawns Owners --> */}
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
              <img src={hall} alt="Photographers" class="img-fluid" />
            </div>
            <div class="col-lg-8">
              <div class="info-section">
                <h5>For Halls and Lawns Owners:</h5>
                <ul>
                  <li>
                    Schedule Events: Manage event bookings, schedule
                    availability, and coordinate with clients to ensure seamless
                    event planning.
                  </li>
                  <li>
                    Manage Venue Bookings: Keep track of all venue bookings,
                    including dates, times, and client details, to avoid
                    scheduling conflicts.
                  </li>
                  <li>
                    Coordinate with Clients: Communicate efficiently with event
                    organizers, address inquiries, and provide necessary
                    assistance throughout the planning process.
                  </li>
                  <li>
                    Handle Logistical Details: Manage all logistical aspects of
                    events, including setup requirements, equipment rentals, and
                    onsite coordination, to ensure smooth execution.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row justify-content-center">
          <div class="col-lg-10">
            {/* <!-- Section Title --> */}
            <div class="section-title">
              <h5>
                EventsGo provides tailored solutions for each stakeholder,
                empowering them to streamline their operations, enhance customer
                experiences, and drive success in their respective fields within
                the events industry.
              </h5>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section>
        {/* <!-- accordion End --> */}
        {/* <!--? gallery Products Start --> */}
        <div class="gallery-area fix">
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              {/* <!-- First Gallery Image --> */}
              <div class="col-lg-3 col-md-3 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery1"></div>
                  </div>
                </div>
              </div>
              {/* <!-- Second Gallery Image --> */}
              <div class="col-lg-3 col-md-3 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery2"></div>
                  </div>
                </div>
              </div>
              {/* <!-- Third Gallery Image --> */}
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery3"></div>
                  </div>
                </div>
              </div>
              {/* <!-- Fourth Gallery Image --> */}
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery4"></div>
                  </div>
                </div>
              </div>
              {/* <!-- Fifth Gallery Image --> */}
              <div class="col-lg-3 col-md-3 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery5"></div>
                  </div>
                </div>
              </div>
              {/* <!-- Sixth Gallery Image --> */}
              <div class="col-lg-3 col-md-3 col-sm-6">
                <div class="gallery-box">
                  <div class="single-gallery">
                    <div class="gallery-img gallery6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--?Why Start --> */}
      <section class="home-blog-area section-padding30" id="why">
        <div class="container">
          {/* <!-- Section Tittle --> */}
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8">
              <div class="section-tittle text-center mb-50">
                <h2>Why EventsGo</h2>
                <p>
                  EventsGo offers numerous advantages that streamline event
                  management and elevate professionalism. Here's why EventsGo
                  stands out:
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    {/* <!-- Blog date --> */}
                    <div class="text-center">
                      <h4>1. Efficiency at Your Fingertips:</h4>
                      <p>
                        With EventsGo, managing events becomes effortless. From
                        sending invitations to coordinating with partners,
                        everything is centralized, saving time and reducing
                        stress.
                      </p>
                    </div>
                  </div>
                  <div class="text-center">
                    <h4>3. Convenience:</h4>
                    <p>
                      Access all your event management tools whenever and
                      wherever you are, directly from your smartphone. Say
                      goodbye to paperwork chaos and never worry about forgotten
                      details again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    <div class="text-center">
                      <h4>2. Seamless Communication:</h4>
                      <p>
                        Stay connected with partners and organizers
                        effortlessly. Send updates, reminders, and announcements
                        in real-time, ensuring everyone is informed and on the
                        same page.
                      </p>
                    </div>
                  </div>
                  <div class="text-center">
                    <h4>4. Professionalism:</h4>
                    <p>
                      Impress clients with your organization and tech-savviness.
                      With EventsGo, you showcase your dedication to delivering
                      exceptional events, enhancing your reputation as a
                      professional in the industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--?Benifit Start --> */}
      <section class="home-blog-area">
        <div class="container">
          {/* <!-- Section Tittle --> */}
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8">
              <div class="section-tittle text-center mb-50">
                <h2>Benefits of EventsGo</h2>
                <p>
                  The benefits of EventsGo are tailored to empower partners in
                  the event industry, revolutionizing their approach to event
                  management:
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    {/* <!-- Blog date --> */}
                    <div class="text-center">
                      <h4>1. Effortless Efficiency: </h4>
                      <p>
                        Streamline your event operations seamlessly with
                        EventsGo, ensuring meticulous management for maximum
                        success and customer delight.
                      </p>
                    </div>
                  </div>
                  <div class="text-center">
                    <h4>3. Tailored Triumphs:</h4>
                    <p>
                      Craft bespoke packages that captivate your audience and
                      position you as a leader in the industry, thanks to
                      EventsGo's precision pricing and service customization
                      features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    <div class="text-center">
                      <h4>2. Personalized Perfection:</h4>
                      <p>
                        Elevate client satisfaction to new heights by delivering
                        tailor- made experiences that reflect their unique
                        vision and preferences, curated through EventsGo's
                        personalized messaging and offerings.
                      </p>
                    </div>
                  </div>
                  <div class="text-center">
                    <h4>4. Empowered Preparation:</h4>
                    <p>
                      Stay ahead of the game with automated reminders and
                      notifications from EventsGo, empowering you to anticipate
                      needs and execute flawlessly every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    <div class="text-center">
                      <h4>5. Endearing Engagements:</h4>
                      <p>
                        Forge lasting connections with clients using intuitive
                        CRM tools, ensuring each interaction leaves a memorable
                        impression and cultivates enduring loyalty.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="text-center">
                    <h4>6. Unified Upliftment: </h4>
                    <p>
                      Experience the simplicity of comprehensive account
                      management on EventsGo, where profiles, finances, and
                      subscriptions seamlessly converge into a single, powerful
                      platform. This empowers you to focus on creating
                      unforgettable experiences without the hassle of
                      administrative burdens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-10">
                {/* <!-- Section Title --> */}
                <div class="section-title">
                  <h5>
                    Ready to revolutionize your event management journey? Join
                    the EventsGo community today and discover the ease of
                    planning flawless events.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--? Pricing Card Start --> */}
      <section class="pricing-card-area section-padding2" id="pricing">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8">
              <div class="section-tittle text-center mb-100">
                <h2>Pricing</h2>
                {/* <!-- <p>There arge many variations ohf passages of sorem gp ilable, but the majority have ssorem
                                gp iluffe.</p> --> */}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
              <div class="single-card text-center mb-30">
                <div class="card-top">
                  <span>Per year</span>
                  <h4>₹ 8K</h4>
                </div>
                <div class="card-bottom">
                  <ul>
                    <li>Easy Customizable</li>
                    <li>1 Year Support Service</li>
                    <li>1 User license</li>
                    <li>Reports & Billing</li>

                    <li> Agent Mobile App</li>
                  </ul>
                  <a href="services.html" class="black-btn">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
              <div class="single-card text-center mb-30">
                <div class="card-top">
                  <span>Per Year</span>
                  <h4>₹ 8K</h4>
                </div>
                <div class="card-bottom">
                  <ul>
                    <li>Easy Customizable</li>
                    <li>1 Year Support Service</li>
                    <li>1 User license</li>
                    <li>Reports & Billing</li>

                    <li> Agent Mobile App</li>
                  </ul>
                  <a href="services.html" class="black-btn">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-10">
              <div class="single-card text-center mb-30">
                <div class="card-top">
                  <span>Per Year</span>
                  <h4>₹ 8K</h4>
                </div>
                <div class="card-bottom">
                  <ul>
                    <li>Easy Customizable</li>
                    <li>1 Year Support Service</li>
                    <li>1 User license</li>
                    <li>Reports & Billing</li>

                    <li> Agent Mobile App</li>
                  </ul>
                  <a href="services.html" class="black-btn">
                    Purchase Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
