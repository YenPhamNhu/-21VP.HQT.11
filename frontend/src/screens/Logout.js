import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


  function Logout() {
    const navigate = useNavigate();
    const auth = localStorage.getItem("item_key");
  
    const handleLogout = () => {
      // Trigger custom event to notify App component before clearing the storage
      const logoutEvent = new Event("logout");
      window.dispatchEvent(logoutEvent);
  
      // Clear the storage
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("item_key", ""); // Update the key to clear from local storage
  
      navigate("/");
    };

  useEffect(() => {
    handleLogout(); // Automatically execute handleLogout when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="buttons-container" style={styles.container}>
      <li>
        {auth ? (
          <Link onClick={handleLogout} to="/login" style={styles.link}>
            Đăng Xuất
          </Link>
        ) : (
          <Link to="/login" style={styles.link}>
            Đăng Xuất
          </Link>
        )}
      </li>
      {/* You can add a logout message or UI here if needed */}
      <span style={styles.logoutMessage}>Logging out...</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    margin: "10px",
  },
  logoutMessage: {
    fontStyle: "italic",
    color: "gray",
  },
};

export default Logout;