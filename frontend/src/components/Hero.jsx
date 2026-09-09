function Hero() {
  const scrollToCakes = () => {
    document
      .getElementById("cakes")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      className="hero"
      id="home"
    >
      <div className="hero-content">

        <p className="hero-tag">
          🎂 Fresh Cakes Delivered To Your Door
        </p>

        <h1>
          Delicious Cakes For
          <br />

          Every
          <span> Celebration</span>
        </h1>

        <p className="hero-description">
          Order freshly baked and delicious cakes for birthdays,
          anniversaries, weddings, and every special moment.
        </p>

        <div className="hero-buttons">

          <button
            className="explore-btn"
            onClick={scrollToCakes}
          >
            Explore Cakes 🎂
          </button>

        </div>

      </div>

      <div className="hero-image">
        🎂
      </div>

    </section>
  );
}

export default Hero;