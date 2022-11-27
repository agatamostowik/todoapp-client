import { Link } from "react-router-dom";
import { ReactComponent as HomePicture } from "../../assets/main-picture.svg";
// import picture from "../../assets/Picture1.png";
import "./home.scss";

export const Home = () => {
  return (
    <div id="home">
      <div className="container__border">
        <div className="container">
          <div className="home__content">
            <section className="home__text__container">
              <div className="home__span">Not another boring...</div>
              <h1 className="home__title">TO-DO list</h1>
              <p className="home__paragraph">
                Maile data centers have top-notch security and surveillance,
                with a reliable 99.9% uptime. Benefit from secure email hosting
                that supports encryption both at rest and end-to-end, along with
                S/MIME message encryption.
              </p>
              <div className="home__btn__wrapper">
                <button className="btn">
                  <Link className="btn__text" to="/signin">
                    Sign in
                  </Link>
                </button>
              </div>
            </section>
            <div className="home__picture">
              <HomePicture width="100%" height="100%" viewBox="0 0 576 386" />
              {/* <img src={picture} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
