import { Link } from "react-router-dom";
import picture from "../../assets/rsz_main-picture.png";
import { Button } from "../../components/Button/Button";
import "./home.scss";

export const Home = () => {
  return (
    <div id="home">
      <div className="container__border">
        <div className="container">
          <div className="home__content">
            <section className="home__section">
              <div className="home__title__small">Not another boring...</div>
              <h1 className="home__title">TO-DO list</h1>
              <p className="home__text">
                A modern and simple task management tool that you can use as an
                online planner to help you stay more productive. Keep track of
                your daily tasks with TODO-LIST. Sign in today and explore its
                features for free.
              </p>
              <div className="button">
                <Link to="/signin">
                  <Button>Sign in</Button>
                </Link>
              </div>
            </section>
            <div className="home__picture">
              <img src={picture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
