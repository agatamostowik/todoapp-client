import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";
import { useEffect, useState } from "react";
import { getUrl } from "./helpers";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { Loader } from "./components/Loader";

const fetchProfile = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/auth/me`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = await fetchProfile();

        dispatch(setUser({ user: user }));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getProfile();
  }, []);

  if (isLoading) {
    return <Loader size="50" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
