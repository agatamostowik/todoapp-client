import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "../../helpers";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button/Button";
import { setUser } from "../../redux/slices/userSlice";
import "./signin.scss";

const logIn = async (data) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/auth/signin`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const Signin = () => {
  const [email, setEmail] = useState("kochamapawelka@wp.pl");
  const [password, setPassword] = useState("qwerty123");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  console.log(isAuthenticated);
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = { email: email, password: password };
      const user = await logIn(data);
      dispatch(setUser({ user: user }));
    } catch (error) {
      console.log("error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div id="signin">
      {isAuthenticated ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <div className="container__border">
          <div className="container">
            <div className="signin__content">
              <h2 className="sign__header h2">Sign in to your account</h2>
              <form className="sign__form" onSubmit={handleSubmit}>
                <div>
                  <Input
                    id="email"
                    label="Email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    label="Password (8 characters minimum)"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    autoComplete="current-password"
                  />
                </div>
                <Button>Sign in</Button>
              </form>
              <span className="span">
                <span>
                  New here?{" "}
                  <Link className="link" to="/signup">
                    Sign up
                  </Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
