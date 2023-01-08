import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { Dropdown } from "../Dropdown/Dropdown";
import { FiMenu } from "react-icons/fi";
import { getUrl } from "../../helpers";
import "./UserPanel.scss";

const logout = async () => {
  const url = getUrl();

  await fetch(`${url}/api/auth/signout`, {
    credentials: "include",
    method: "POST",
  });
};

export const UserPanel = () => {
  const [isOpen, setIsUserPanelOpen] = useState(false);

  const dispatch = useDispatch();
  const ref = useRef();

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsUserPanelOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });

  const handleClick = () => {
    setIsUserPanelOpen(true);
  };

  const signOut = async () => {
    try {
      await logout();

      dispatch(resetUser());
    } catch (error) {
      console.log(error);
    }
  };

  const options = [{ label: "Sign out", value: "signout" }];

  return (
    <div id="user_panel" ref={ref}>
      <div onClick={handleClick}>
        <FiMenu size={35} color="#ffffff" />
      </div>

      {isOpen ? <Dropdown options={options} onSelect={signOut} /> : null}
    </div>
  );
};
