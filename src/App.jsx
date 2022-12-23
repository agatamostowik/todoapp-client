import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";
import { useEffect, useState } from "react";
import { getUrl } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const user = await fetchProfile();
        dispatch(setUser({ user: user }));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    getProfile();
  }, []);

  if (isLoading) {
    return <div className="loader" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
