import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import { Dropdown } from "../Dropdown/Dropdown";
import { FiMenu } from "react-icons/fi";
import { getUrl } from "../../helpers";
import "./UserPanel.scss";

export const UserPanel = () => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

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

  const handleUserPanelDropdown = () => {
    setIsUserPanelOpen(true);
  };

  const signOut = async () => {
    const url = getUrl();
    try {
      const response = await fetch(`${url}/api/auth/signout`, {
        credentials: "include",
        method: "POST",
      });
      dispatch(resetUser());
    } catch (error) {
      console.log(error);
    }
  };

  const options = [{ label: "Sign out", value: "signout" }];

  return (
    <div
      id="user_panel"
      ref={ref}
      onClick={handleUserPanelDropdown}
      className="userPanelMenu"
      open={isUserPanelOpen}
    >
      <FiMenu size={35} color="#FFFFFF" />

      {isUserPanelOpen ? (
        <Dropdown
          isUserPanelOpen={isUserPanelOpen}
          options={options}
          handleClick={signOut}
        />
      ) : null}
    </div>
  );
};
