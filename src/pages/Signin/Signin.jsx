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
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example123");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

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
      const user = await logIn({ email: email, password: password });

      dispatch(setUser({ user: user }));
    } catch (error) {
      console.log("error:", error);
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div id="signin">
      <div className="container__border">
        <div className="container">
          <div className="signin__content">
            <h2 className="signin__header h2">Sign in to your account</h2>
            <form className="signin__form" onSubmit={handleSubmit}>
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={handleEmail}
                autofocus={true}
                isDisabled={isLoading}
              />
              <Input
                id="password"
                label="Password (8 characters minimum)"
                type="password"
                value={password}
                onChange={handlePassword}
                autoComplete="current-password"
                isDisabled={isLoading}
              />
              <div className="signin__button">
                <Button isLoading={isLoading} type="submit">
                  Sign in
                </Button>
              </div>
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
    </div>
  );
};
