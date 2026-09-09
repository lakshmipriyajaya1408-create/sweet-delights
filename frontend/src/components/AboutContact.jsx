import "./AboutContact.css";

function AboutContact() {
  return (
    <div className="sd-scope">

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-wrapper">

          <div className="about-left">
            <p className="tag">Our Story</p>

            <h2>
              Every celebration
              <span className="script">
                deserves something sweet
              </span>
            </h2>
          </div>

          <div className="about-right">

            <p>
              At Sweet Delights, we believe that a cake is more than just
              dessert. It is part of your birthday, anniversary, wedding,
              and every special memory.
            </p>

            <p>
              Every cake is freshly baked with quality ingredients and
              prepared with care to make your celebration even more special.
            </p>

            <div className="about-highlights">

              <div>
                <strong>Fresh</strong>
                <span>Made to order</span>
              </div>

              <div>
                <strong>Quality</strong>
                <span>Premium ingredients</span>
              </div>

              <div>
                <strong>Delivery</strong>
                <span>Right to your door</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-wrapper">

          <div className="contact-text">

            <p className="tag">Get in touch</p>

            <h2>
              Let's make your
              <span className="script">
                celebration sweet
              </span>
            </h2>

            <p>
              Have a question about our cakes or need help placing an
              order? We're always happy to help.
            </p>

          </div>


          <div className="contact-box">

            <div className="contact-detail">
              <span className="contact-label">
                Email
              </span>

              <strong>
                sweetdelights@example.com
              </strong>
            </div>


            <div className="contact-line"></div>


            <div className="contact-detail">
              <span className="contact-label">
                Phone
              </span>

              <strong>
                +91 98765 43210
              </strong>
            </div>


            <button
              className="contact-order-btn"
              onClick={() => {
                document
                  .getElementById("cakes")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Explore Our Cakes
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutContact;