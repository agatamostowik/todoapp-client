import { Link } from "react-router-dom";
import picture from "../../assets/rsz_main-picture.png";
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
                A modern and simple task management tool that you can use as an
                online planner to help you stay more productive. Keep track of
                your daily tasks with TODO-LIST. Sign in today and explore its
                features for free.
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
              {/* <HomePicture width="100%" height="100%" viewBox="0 0 576 386" /> */}
              <img alt="todolist" src={picture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
